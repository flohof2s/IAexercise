const express = require('express')

const app = express()

const PORT = 3000

app.get("/",(req,res)=>{
    res.send("Welcome at Test API for Integration Architecture")
})

app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server is listening at Port:",PORT)
    }
    else{
        console.error('Error:',error)
    }
    
})