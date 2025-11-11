const express = require('express');
const router = express.Router();
const SalesMan = require('../models/salesman')
const computeBonusSalary = require('../controller/utils');
const eventBus = require('../rx/eventBus');
const SocialPerformanceRecord = require('../models/SocialPerformanceRecord');

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
        if(salesMan == null){
            res.status(404).json({ message: "SalesMan not found with id: "+id });
        }
        else{
            res.status(200).json(salesMan);
        }
        
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
        res.status(200).json({"bonusSalary":bonusSalary});
    } catch(error){
        res.status(500).json(error);
    }
});

//POST create
router.post("/",async (req,res)=>{
    try{
        const salesman = SalesMan(req.body);
        const savedSalesMan = await salesman.save();

        // RxJS-Event auslösen
        eventBus.emit({
            type: 'SALESMAN_CREATED',
            payload: savedSalesMan,
            ts: Date.now(),
        });
        res.status(200).json(savedSalesMan);
    } catch(error){
        res.status(500).json(error)
    }
});

//UPDATE by id
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedSalesMan = await SalesMan.findOneAndUpdate(
        { id: id },               
        { $set: req.body },        
        { new: true }            
        );

        if (!updatedSalesMan) {
        return res.status(404).json({ message: "SalesMan not found" });
        }

        res.status(200).json(updatedSalesMan);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

//DELETE all
router.delete("/",async (req,res)=>{
    try{
        await SocialPerformanceRecord.deleteMany();
        const result = await SalesMan.deleteMany();
        res.status(200).json(result);
    } catch(error){
        res.status(500).json(error);
    }
});

module.exports = router