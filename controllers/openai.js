
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });


const OpenAI =  require('openai');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
  });

  

//summarize text
exports.summarize = async (req, res) => {
    const { text } = req.body;
    console.log(`text: ${text}`);
    try {
        prompt = `summarize: ${text}`;
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
          }); 
          console.log(response.choices[0]);
          if (response) {
            console.log('response' , response.choices[0].message.content);
            if (response.choices[0].message.content) {
              return res.status(200).json(response.choices[0].message.content);
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message});
    }
}
