const express = require('express');
const router = express.Router();
const SalesMan = require('../models/salesman')

//GET List
router.get("/",async (req,res)=>{
    try{
        const salesmen = await SalesMan.find();
        res.status(200).json(salesmen);
    } catch(error){
        res.status(500).json(error);
    }
});