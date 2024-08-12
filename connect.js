const express = require('express');
const mongoose=require('mongoose');
mongoose.set("strictQuery", true);
require("dotenv").config();


async function  connectDB(url){
    return mongoose.connect(url);
}


module.exports={
  connectDB,
};
