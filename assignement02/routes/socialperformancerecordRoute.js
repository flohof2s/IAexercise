const express = require('express');
const router = express.Router();
const SocialPerformanceRecord = require('../models/SocialPerformanceRecord')

//GET List
router.get("/",async (req,res)=>{
    try{
        const sprList = await SocialPerformanceRecord.find();
        res.status(200).json(sprList);
    } catch(error){
        res.status(500).json(error);
    }
});

//GET by id
router.get("/:id",async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const spr = await SocialPerformanceRecord.findOne({id: id});
        res.status(200).json(spr);
    } catch(error){
        res.status(500).json(error);
    }
});

//GET by SalesManId
router.get("/salesman/:id",async (req,res)=>{
    try{
        const salesManId = parseInt(req.params.id);
        const sprList = await SocialPerformanceRecord.find({salesManId: salesManId});
        res.status(200).json(sprList);
    } catch(error){
        res.status(500).json(error);
    }
});

//POST create
router.post("/",async (req,res)=>{
    try{
        const spr = SocialPerformanceRecord(req.body);
        const savedSpr = await spr.save();
        res.status(200).json(savedSpr);
    } catch(error){
        res.status(500).json(error)
    }
});

//DELETE delete
router.delete("/:id",async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        const spr = await SocialPerformanceRecord.deleteMany({id:id})
        res.status(200).json(spr);
    } catch(error){
        res.status(500).json(error)
    }
});

module.exports = router