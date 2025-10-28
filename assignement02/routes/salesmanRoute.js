const express = require('express');
const router = express.Router();
const SalesMan = require('../models/salesman')
const computeBonusSalary = require('../controller/utils');

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
        const id = parseInt(req.params.id);
        const salesMan = await SalesMan.findOne({id: id});
        res.status(200).json(salesMan);
    } catch(error){
        res.status(500).json(error);
    }
});

//GET bonus salary by id
router.get("/:id/bonussalary",async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const salesMan = await SalesMan.findOne({id: id});
        const bonusSalary = await computeBonusSalary(salesMan);
        res.status(200).json(bonusSalary);
    } catch(error){
        res.status(500).json(error);
    }
});

//POST create
router.post("/",async (req,res)=>{
    try{
        const salesman = SalesMan(req.body);
        const savedSalesMan = await salesman.save();
        res.status(200).json(savedSalesMan);
    } catch(error){
        res.status(500).json(error)
    }
});

//DELETE delete
router.delete("/:id",async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const salesman = await SalesMan.deleteMany({id:id})
        res.status(200).json(salesman);
    } catch(error){
        res.status(500).json(error)
    }
});

module.exports = router