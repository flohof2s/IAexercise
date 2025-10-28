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

//GET by id
router.get("/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        const salesMan = await SalesMan.findOne({_id: id});
        res.status(200).json(salesMan);
    } catch(error){
        res.status(500).json(error);
    }
});

//POST create
router.post("/",async (req,res)=>{
    try{
        const salesman = SalesMan(req.body);
        const savedSalesMan = salesman.save();
        res.status(200).json(savedSalesMan);
    } catch(error){
        res.status(500).json(error)
    }
});

module.exports = router