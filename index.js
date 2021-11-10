const express= require('express');
const app = express();
const cors =require('cors')
require('dotenv').config()
const Port = process.env.PORT || 3000
const Agent = require('./model');

app.use(cors({
    origin: '*',
    methods: '*'
}));
app.use(express.json());
app.listen(Port, ()=>{
    console.log(`Listenning to server ${Port}`);
})

app.get('/cities', async(req,res,next)=>{
    const cities = await Agent.find({}).distinct('city');
    res.json(cities)
})

app.get('/agents/:city', async(req,res,next)=>{
    const city = req.params.city
    const agents = await Agent.find({city:city});
    res.json(agents)
})

app.put('/agent/:license_number/edit', (req, res, next)=>{
    const license_number = req.params.license_number;
    const newCity = req.body.city;
    console.log(newCity);
    if(!newCity) return res.status(400).send('City Not Entered!')
    Agent.updateOne({license_number},{city: newCity}).then(res.send('Updated Successfully'))
    .catch((err)=> console.log(err));
})