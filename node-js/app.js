const smileAndFly = require('./biura_podrozy/all')

const express = require('express')
const port = 8888

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
    smileAndFly.getOffers(/*q.dateFrom,q.dateTo,q.fromWhere,q.toWhere,q.adults,q.kids,q.order,q.results*/).then(e=>{res.send(JSON.stringify(e))})
})

app.listen(port)
