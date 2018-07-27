const express = require('express')
    ,bodyParser= require('body-parser')
    ,controller = require('./controller')
    const massive= require('massive');
    require('dotenv').config()
   
const app = express()

app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then(dbInstance =>{
    app.set('db', dbInstance)
}).catch(err=>console.log(err))

const PORT = 4000
app.listen(PORT,()=> console.log('Running on port', PORT))