const express = require('express')
const { generatePrompt } = require('../Controller/GeneratorController')

const promptRouter = express.Router()

promptRouter.post('/generate', generatePrompt)

module.exports={promptRouter}