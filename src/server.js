//@ts-ignore
const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const router = require('express').Router();
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongodb.MongoClient.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      db = client.db()
      app.listen(process.env.PORT || 5000, fn);
    }
  )

//@ts-ignore
const post = async  (req, res) => {
    check = await db.collection('stats').findOne({ deviceID: req.body.allState.deviceID , stats : req.body.allState.stats});
    if(check){
    await db.collection("stats").findOneAndUpdate({ deviceID: req.body.allState.deviceID},{$set : {stats:req.body.allState.stats}},
        function (err, docs) {
            if (err){
                console.log(err)
                res.send(err)
            }
            else{
                console.log(docs)
                res.send("success")
            }})}
    else{
        await db.collection("stats").insertOne({ deviceID: req.body.allState.deviceID , stats : req.body.allState.stats},
            function (err, docs) {
                if (err){
                    console.log(err)
                    res.send(err)
                }
                else{
                    console.log(docs)
                    res.send("success")
                }}) 
    }
}
//@ts-ignore
const get = async (req, res) => {
    console.log(req)
}
//@ts-ignore
const put = async(req, res) => {
    console.log(req.body.allState)
    check = await db.collection('wardle').findOne({ deviceID: req.body.allState.deviceID , solution : req.body.allState.solution});
    console.log(check)
    if(check){
        await db.collection('wardle').findOneAndUpdate({ deviceID: req.body.allState.deviceID , solution : req.body.allState.solution},
            {$set : {guesses:req.body.allState.guesses}},
            function (err, docs) {
                if (err){
                    console.log(err)
                    res.send(err)
                }
                else{
                    console.log(docs)
                    res.send('success')
                }})
}else {await db.collection("wardle").insertOne({ deviceID: req.body.allState.deviceID , solution : req.body.allState.solution ,guesses:req.body.allState.guesses},
    function (err, docs) {
        if (err){
            console.log(err)
            res.send(err)
        }
        else{
            console.log(docs)
            res.send("success")
        }})}

}

router.post('/',post)
router.get('/',get)
router.put('/',put)
app.use('/',router)



const fn = () => console.log("listening");


