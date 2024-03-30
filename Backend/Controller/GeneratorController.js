const axios = require('axios')

require('dotenv').config()

const generatePrompt = async (req,res)=>{
    const {query} = req.body
    const apiKey  = process.env.OPENAI_API_KEY
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-1106	/completions',{
            prompt: query,
            max_tokens: 150,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        })

        console.log(response)
        const generatedPrompt = response.data.choices[0].text.trim();
        res.json({ prompt: generatedPrompt,res:response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' , error:error});
    }
}

module.exports={generatePrompt}