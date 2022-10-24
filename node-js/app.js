const smileAndFly = require('./biura_podrozy/all')

const express = require('express')
const port = process.env.PORT || 8888

const app = express()

const cors = require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get('/', function (req, res){
    q = req.query
    try{
        smileAndFly.getOffers(q,req.headers['x-forwarded-for']||req.socket.remoteAddress).then(e=>{res.send(JSON.stringify(e))})
    }catch(e){
        console.log(e)
        res.send(JSON.stringify({'error': 'unable to fetch offers'}))
    }
})

app.listen(port)
