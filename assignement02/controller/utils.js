const SalesMan = require('../models/salesman')
const SocialPerformanceRecord = require('../models/SocialPerformanceRecord')

async function computeBonusSalary(salesman){
    const sprList = await SocialPerformanceRecord.find({salesManId:salesman.id});
    if(sprList.length == 0){
        return 0;
    }
    let sum = 0;
    sprList.forEach((spr)=>{
        sum+=spr.score;
    });

    return (sum / sprList.length) * 1000;
}

module.exports = computeBonusSalary;