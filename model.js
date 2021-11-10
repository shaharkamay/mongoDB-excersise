const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI).then(console.log('Enterd DB..'))
const AgentSchema = new mongoose.Schema({
    license_number:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
})

const Agent = mongoose.model('agent', AgentSchema);
module.exports= Agent;