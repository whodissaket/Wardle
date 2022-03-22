//@ts-ignore
const express = require("express");
//const session = require("express-session");
const cors = require("cors");
const router = require('express').Router();
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
dotenv.config();
console.log(process.env.MONGO_URL)
const connectdb = require('./config/db');
connectdb();

const app = express();
app.use(cors());
app.use(express.json());
//@ts-ignore
const post = async  (req, res) => {
    console.log(req.body)
}
//@ts-ignore
const get = async (req, res) => {
    console.log(req)
}
//@ts-ignore
const put = async(req, res) => {
    console.log(req.body)
}

router.post('/',post)
router.get('/',get)
router.put('/',put)

app.use('/',router)



const fn = () => console.log("listening");

app.listen(process.env.PORT || 5000, fn);

