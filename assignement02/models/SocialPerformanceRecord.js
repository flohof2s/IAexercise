const mongoose = require('mongoose')

const SocialPerformanceRecordSchema = mongoose.Schema(
    {
        id:{
            type:Number,
            required: true
        },
        year:{
            type:Number,
            required:true
        },
        score:{
            type:Number,
            required: true
        },
        salesManId:{
            type: Number,
            required: true
        }
    }
);

const SocialPerformanceRecord = mongoose.model('SocialPerformanceRecord',SocialPerformanceRecordSchema);

module.exports = SocialPerformanceRecord;