const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const salesManRoutes = require('./routes/salesmanRoute');
app.use('/api/salesman',salesManRoutes);

const SocialPerformanceRecordRoutes = require('./routes/socialperformancerecordRoute');
app.use('/api/socialperformancerecord',SocialPerformanceRecordRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome at Test API for Integration Architecture");
});

app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server is listening at Port:",PORT);
    }
    else{
        console.error('Error:',error);
    }
});

main().catch((error)=>{
    console.error(error);
})

async function main(){
    const connectionString = "mongodb://127.0.0.1:27017/IA-Exercise";
    await mongoose.connect(connectionString);
    mongoose.set('strictQuery',true);
}