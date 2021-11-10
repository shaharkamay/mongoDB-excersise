const csv = require('csvtojson');
const path = require('path');
const mongoose = require('mongoose');
const Agent = require('./model');

const csvFile = path.resolve('./resources/agents.csv');
csv().fromFile(csvFile).then(agents => {
   const agentCollection = agents.map((agent) => {
       return{
            license_number: Object.values(agent)[0].trim(),
            name: Object.values(agent)[1].trim(),
            city: Object.values(agent)[2].trim()
       }
   }).filter(agent => {
       return agent['license_number'] && agent.name && agent.city;
   })
Agent.insertMany(agentCollection).then(console.log('Inserted Successfully')).catch((error) => {console.log(error);})
})