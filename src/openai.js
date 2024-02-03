import { config } from "dotenv"
config()

import OpenAI from "openai"
import readline from "readline"

const openai = new OpenAI({
    apiKey: "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"
  });

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const responses = [];  // Declare an array to store responses

//userInterface.prompt()
userInterface.on("line", async input => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Respond exclusively in the following format:\n Recipe title:\n ingredients:\n -x\n -y\n -etc\n instructions:\n step one\n step two\netc\nfill out the format with a common recipe that contains at least these ingredients:" + input + "\n"}],
    stream: true,
  });
  for await (const part of stream) {
    const response = part.choices[0].delta.content;
    responses.push(response);  // Push each response into the array
    console.log(part.choices[0].delta);
  }
  userInterface.prompt()
  console.log(responses.join('', ' '));
})