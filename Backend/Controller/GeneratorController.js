const axios = require('axios')

require('dotenv').config()

const generatePrompt = async (req, res) => {
    const { query } = req.body
    const apiKey = process.env.OPENAI_API_KEY
    console.log(apiKey)
    console.log(query)
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo-instruct",
            prompt: `
            [Act is a Prompt Generator]
            Generate a prompt to obtain comprehensive step-by-step answers for "${query}" from AI tools out there. The prompt should guide the AI model to provide a detailed explanation of the topic, broken down into clear and structured steps.

            The generated prompt should yield the following when used on AI tools

            The prompt should follow the basic layout and pattern of the example shown below:-

            '[ Act as Django Developer ]

            I want to learn Django. I am not familiar with Python.

            I want to learn through chat gpt conversation.Please create a plan for me So, that I will get comfortable with Django, I am inclined more towards learning through solving exercise. 

            Do not generate all content at once, give some content which I will read and understand then provide me exercise to solve and then move to next topic and so on. 

            Before giving the answer, ask me any clarification question for better clarity'

            The generated prompt should follow the layout and pattern of the above given example and should never copy the above example. Each prompt should be unique but following the same kind of pattern shown in the above example.

            The prompt should be generated accourding to the ${query} and should only follow the pattern of the given example and should not copy the content of the given example.

            It should always start with a 
            
            [Act as [${query}] expert]
            The next lines should follow the pattern and layout provided in the example above. Without copying the content of the example.

            Ensure that it is not generating the answer for "${query}". The main purpose for this application is to GENERATE PROMPTS which can be used to get comprehensive step by step answers from other AI Tools. 

            `,
            max_tokens: 200,
            temperature: 0.7,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        const generatedPrompt = response.data.choices[0].text.trim();
        res.json({ prompt: generatedPrompt, res: response.data });
    } catch (error) {
        console.error(error);

        // Handling rate limiting specifically
        if (error.response && error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
        }

        res.status(500).json({ message: 'Internal server error', err: error });
    }
}

module.exports = { generatePrompt }