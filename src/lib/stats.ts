import { send } from 'process'
import { MAX_CHALLENGES } from '../constants/settings'
import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'
import {
  sendToDB
  } from './toDB'
// In stats array elements 0-5 are successes in 1-6 trys
import { getCookie} from './cookies'
export const addStatsForCompletedGame = (
  gameStats: GameStats,
  count: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats }

  stats.totalGames += 1

  if (count >= MAX_CHALLENGES) {
    // A fail situation
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count] += 1
    stats.currentStreak += 1

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)

  saveStatsToLocalStorage(stats)
  const deviceID:any=getCookie('deviceID')
  var obj:object={stats,deviceID}
  sendToDB(obj)
  return stats
}

const defaultStats: GameStats = {
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
  // yaha pe bhi kr skte DB vala kaam dekh lenge
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
