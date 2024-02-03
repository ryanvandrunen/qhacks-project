import { config } from "dotenv"
config()

import OpenAI from "openai"
import readline from "readline"

const foodDictionary = {
    "candy": ["cotton candy", "candy cane", "chocolate candy", "gummy candy"],
    "onion": ["red onion", "yellow onion", "white onion", "sweet onion"],
    "flour": ["all purpose flour", "whole wheat flour"],
    "fruit": ["apple fruit", "banana fruit", "orange fruit", "grape fruit", "strawberry fruit"],
    "vegetable": ["carrot vegetable", "broccoli vegetable", "spinach vegetable", "tomato vegetable", "bell pepper vegetable"],
    "snack": ["popcorn snack", "pretzel snack", "potato chips snack", "cheese puff snack"],
    "dessert": ["ice cream dessert", "cake dessert", "pie dessert", "cookies dessert", "brownie dessert"],
  };

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
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": `Respond exclusively in the following format:\n 
    Recipe title: title\n 
    ingredients:\n x\n y\n etc make sure you include every ingredient mentioned in the recipe including the ones not specified, DO NOT put dashes before each line\n 
    instructions:\n step one step two etc 
    cooking time: in the form "xhxxm" no matter what, even if time is less than an hour it should be in form 0hxxm \n 
    tags: list of key words that directly relate to the recipe, for example if the recipe has no dairy products include dairy-free, 
    if a recipe has lots of protein say high-protein, other tags could include: easy, quick, if not a lot of ingredients or low cooking time, 
    one-pot, if only requires one pot, etc\n 
    serving size: an integer of how many people the recipe feeds \n
    fill out the format with a common recipe that contains at least these ingredients:` + input + `\n`}],
  });
    const response = chatCompletion.choices[0].message.content;
    responses.push(response);  // Push each response into the array
    console.log(chatCompletion.choices[0].message);
    //userInterface.prompt()
    let resString = "";
    resString = responses.join('', ' ');
    console.log(resString);

    // const titleRegex = /Recipe title: (.+)$/m;
    // const match = responses.join('', ' ').match(titleRegex);
    // const title = match ? match[1] : "No title found";
    // console.log(title);

    const title = resString.match(/Recipe title: (.+)/)[1];
    const ingredients = resString.match(/ingredients:\n([\s\S]+?)instructions:/)[1].split('\n').filter(item => item.trim() !== '');
    const instructions = resString.match(/instructions:\n([\s\S]+?)cooking time:/)[1].trim();
    const time = resString.match(/cooking time: (.+)/)[1];
    const tags = resString.match(/tags: (.+)/)[1].split(', ').map(tag => tag.trim());
    const servingSize = parseInt(resString.match(/serving size: (\d+)/)[1]);
    
    console.log(title);
    console.log(ingredients);
    console.log(instructions);
    console.log(time);
    console.log(tags);
    console.log(servingSize);
})



