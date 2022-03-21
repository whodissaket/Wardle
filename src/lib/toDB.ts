const axios = require('axios')

export const sendToDB = async (allState : object)=>{
    const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/`,
        allState,
      )
}
export const updToDB =async (allState : object)=>{
    const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/`,
        allState,
      )
}
export const getFromDB = async ()=>{
    const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/`,
      )
}