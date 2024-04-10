const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
const OpenAI = require('openai')
require('dotenv').config()

app.use(express.json())
app.use(cors())


app.get('/recipeStream', (req, res) => {
  const ingredients = req.query.ingredients
  const mealType = req.query.mealType
  const cuisine = req.query.cuisine;
  const cookingTime = req.query.cookingTime
  const complexity = req.query.complexity


  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
  

  const sendEvent = (chunk) => {
    let chunkResponse;

    if (chunk.choices[0].finish_reason === "stop") {
      res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`)
    } else {
      if (
        chunk.choices[0].delta.role &&
        chunk.choices[0].delta.role === "assistant"
      ) {
        chunkResponse = {
          action: "start",
        };
      } else {
        chunkResponse = {
          action: "chunk",
          chunk: chunk.choices[0].delta.content,
        };
      }
      res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
    }
  }


  const prompt = [];
  prompt.push("Generate a recipe that incorporates the following details:");
  prompt.push(`[Ingredients: ${ingredients}]`);
  prompt.push(`[Meal Type: ${mealType}]`);
  prompt.push(`[Cuisine Preference: ${cuisine}]`);
  prompt.push(`[Cooking Time: ${cookingTime}]`);
  prompt.push(`[Complexity: ${complexity}]`);
  prompt.push("Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided.");
  prompt.push("The recipe should highlight the fresh and vibrant flavors of the ingredients.");
  prompt.push("Also give the recipe a suitable name in its local language based on cuisine preference.");

  const message = [
    {
      role: "system", 
      content: prompt.join(" "),
    },
  ];

  fetchOpenAICompletionsStream(message, sendEvent);
  
  req.on("close", () => {
    res.end();
  });

})

async function fetchOpenAICompletionsStream(messages, callback) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try{
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      stream: true,
    })

    for await (const chunk of completion) {
      callback(chunk);
    }

  } catch(error) {

  }

}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})