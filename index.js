const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser")
const {connectDB}=require("./connect");
const {checkForAuthentication,restrictTo}=require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");

const app = express();
const PORT=8001;

connectDB("mongodb+srv://agrawalsiddhi2102:03LF81k5ZrXUBnTk@cluster0.xk7ar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("Mongodb connected")
)
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL","ADMIN"]),urlRoute);  //to use /url user need to be logined hence uused the func restrictoLoggedinUser
app.use("/user",userRoute);
app.use("/",staticRoute);  //we can authorize either ny cookeis(only for browsers) or by sending json response

app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        }
    });
    res.redirect(entry.redirectURL)
})




app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`)
});