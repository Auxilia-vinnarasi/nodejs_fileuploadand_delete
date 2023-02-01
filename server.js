const express=require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const path=require("path");

const app=express();

connectDB();
app.use(express.json());

//static folder
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

const port=process.env.port || 5000;


//routes
app.use("/api/v1/user",require("./routes/userRoutes"));

app.get("/",(req,res)=>{
    res.send("App is working")
})

//for notifications 
const http=require("http");
const socketIO=require("socket.io");
const Notify=require("./models/notificationsModel");

const server=http.createServer(app);

//this creates our socket using instance of the server.
const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New client connected.." + socket.id);

    socket.on("initial_data",async()=>{
        const notify=await Notify.find({}).sort({createdAt:-1});
        io.sockets.emit("get_data",notify)
    });

   //submit data
   socket.on("post_data",async(body)=>{
    const title=body;
    const notify=new Notify({title});
    await notify.save();
    io.sockets.emit("change_data");
   })

   socket.on("check_all_notifications",async()=>{
    const notifies=await Notify.find({});

    notifies.forEach((notify)=>{
        notify.read=true;
    })
    await Notify.create(notifies);

    io.sockets.emit("change_data");
   });

   //disconnect is fires when the client leaves the server
   socket.on("disconnect",()=>{
    console.log("user disconnected..")
   })

})


app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})








