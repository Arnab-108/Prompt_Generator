const express = require('express')
const cors = require('cors')
const { promptRouter } = require('./Router/GeneratorRouter')

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('HomePage')
})

app.use('/propmt-generator',promptRouter)

app.listen(8080 , ()=>{
    console.log('Server is running at 8080')
})