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
            Generate a prompt to obtain comprehensive step-by-step answers for "${query}" from AI tools like ChatGPT or Bard. The prompt should guide the AI model to provide a detailed explanation of the topic, broken down into clear and structured steps.

            The generated prompt should outline the following:

            Step 1: Introduction
            Provide a brief overview of "${query}" to set the context for further explanation.

            Step 2: Basic Concepts
            Explain the fundamental concepts related to "${query}" in a clear and understandable manner.

            Step 3: Intermediate Topics
            Delve deeper into intermediate-level topics or techniques associated with "${query}".

            Step 4: Advanced Concepts
            Explore advanced aspects or advanced techniques related to "${query}" for a more comprehensive understanding.

            Step 5: Practical Examples
            Illustrate each step with practical examples or use cases to enhance comprehension.

            Step 6: Conclusion
            Summarize the key points covered and provide any additional insights or resources for further learning.

            Ensure that each step is well-organized, coherent, and provides sufficient detail to guide the user through understanding "${query}" effectively.

            `,
            max_tokens: 300,
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