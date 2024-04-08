const express = require('express');
const cors = require('cors');
const OpenAI = require('openai-api');

const app = express();
app.use(cors());

app.get("/recipeStream", (req, res) => {
  const ingredients = req.query.ingredients;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  console.log(req.query)

  const sendEvent = (chunk) => {
    let chunkResponse;
    if (chunk.choices[0].finish_reason === 'stop') {
      res.write(`data: ${JSON.stringify({ action: "close" })} \n\n`);
    } else {
      if (
        chunk.choice[0].delta.role &&
        chunk.choice[0].delta.role === "assistant"
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
      res.write(`data: ${JSON.stringify(chunkResponse)} \n\n`);
    }
  };
});

async function fetchOpenAICompletionsStream(messages, callback) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const aiModel = 'gpt-3.5-turbo';

  try {
    const completion = openai.chat.completions.create({
      model: aiModel,
      messages: messages,
      stream: true,
    })
    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {

  }

}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

