const express=require('express');
const {restrictTo}=require("../middlewares/auth");

const router=express.Router();
const URL=require("../models/url");

router.get('/',restrictTo(["NORMAL"]) , async(req,res)=>{
    const allurls=await URL.find({createdBy:req.user._id});
    return res.render("home",{  //.render means render a view (HTML page) and send it as the response to the client and home is the exact ejs fiile
        urls:allurls,
    });
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});


router.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports=router;