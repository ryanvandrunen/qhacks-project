import { rejects } from "assert";
import { config } from "dotenv"
config()

import OpenAI from "openai"
import { resolve } from "path";
import { exit } from "process";
import readline from "readline"

import { db } from '../firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";

const openai = new OpenAI({
    apiKey: "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"              //dumb guy "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"  
});

const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

    // Example: Get a random float between 2.5 and 5.5
    const randomValue = getRandomFloat(1.2, 1.4);

function clean() {   

    return new Promise(async (resolve) => {
    const foodDictionary = {
        butter: [ 'kraft peanut butter' ],
        garlic: [
        'janes ultimates honey garlic & thai chili bites',
        'giuseppe pizzeria garlic fingers',
        'janes® pub style bbq or honey garlic wing',
        'janes® honey garlic wings',
        'aqua star garlic & herb shrimp'
        ],
        cinnamon: [ 'ferrara cinnamon hearts' ],
        'all-purpose flour': [ 'giant value all-purpose flour' ],
        celery: [ 'celery' ],
        honey: [
        'janes ultimates honey garlic & thai chili bites',
        'janes® pub style bbq or honey garlic wing',
        'janes® honey garlic wings'
        ],
        mushrooms: [ '227 g sliced white mushrooms' ],
        almonds: [ 'trophy almonds or mixed nuts' ],
        'green pepper': [ 'green peppers' ],
        shrimp: [ 'ocean jewel shrimp ring', 'aqua star garlic & herb shrimp' ],
        mustard: [ "french's mustard" ],
        bread: [
        'country harvest bread',
        'janes frozen breaded chicken',
        'janes™ ultimate breaded haddock'
        ],
        ketchup: [ 'heinz ketchup' ],
        avocado: [ 'avocados', '5 pack avocados' ],
        cabbage: [ "laurie's cabbage rolls" ],
        'peanut butter': [ 'kraft peanut butter' ],
        pasta: [
        'bravo pasta sauce',
        'heinz pasta',
        'classico pasta sauce',
        'classico pasta sauce'
        ],
        peanuts: [ 'planters in-shell peanuts' ],
        sage: [ 'schneiders smoked sausages' ],
        oranges: [ '3 lb seedless oranges', '3 lb cara cara oranges' ],
        'cool whip': [ 'kraft cool whip' ],
        'cottage cheese': [ 'beatrice cottage cheese' ],
        sausage: [ 'schneiders smoked sausages' ],
        hamburger: [ 'hamburger helper side dish' ],
        'all purpose flour': [ 'robin hood all purpose flour' ],
        coffee: [
        'nescafe coffee pods',
        'nescafe coffee pods',
        'tim hortons coffee pods',
        'tim hortons coffee',
        'giant value coffee pods'
        ],
        'green peppers': [ 'green peppers' ],
        herbs: [ 'litehouse dried herbs' ],
        macaroni: [ 'kraft dinner macaroni & cheese' ],
        mushroom: [ '227 g sliced white mushrooms' ],
        'puff pastry': [ 'tenderflake puff pastry' ],
        'chicken wings': [ 'janes frozen chicken wings' ],
        cake: [ "mccain deep'n delicious frozen dessert cake cups" ],
        fish: [ 'catch of the day frozen fish' ],
        'pasta sauce': [
        'bravo pasta sauce',
        'classico pasta sauce',
        'classico pasta sauce'
        ],
        avocados: [ 'avocados', '5 pack avocados' ],
        meat: [ 'san daniele deli meat' ],
        sausages: [ 'schneiders smoked sausages' ],
        chili: [ 'janes ultimates honey garlic & thai chili bites', 'stagg chili' ],
        'miracle whip': [ 'kraft miracle whip spread' ],
        'white mushrooms': [ '227 g sliced white mushrooms' ],
        'bbq sauce': [ "bull's-eye bbq sauce" ],
        'table salt': [ 'windsor table salt' ],
        'iceberg lettuce': [ 'iceberg lettuce' ],
        jam: [ 'e.d. smith triple fruits jam' ],
        almond: [ 'trophy almonds or mixed nuts' ],
        candy: [ 'reese candy', 'fun dip candy', 'merci chocolate candy' ],
        'salad dressing': [ 'kraft salad dressing', 'kraft salad dressing' ],
        steak: [ 'leadbetters cowboy steaks' ],
        'smoked sausage': [ 'schneiders smoked sausages' ],
        rolls: [ "laurie's cabbage rolls" ],
        cookies: [ 'celebration cookies', 'celebration cookies' ],
        sweetener: [ 'splenda sweetener' ],
        granola: [ 'tim hortons granola bars' ],
        'mixed nuts': [ 'trophy almonds or mixed nuts' ],
        cereal: [ "kellogg's cereal", "kellogg's cereal" ],
        'chocolate bars': [ 'lindt chocolate bars' ],
        soup: [ "campbell's chunky soup", "campbell's chunky soup" ],
        bar: [ 'tim hortons granola bars', 'lindt chocolate bars' ],
        splenda: [ 'splenda sweetener' ],
        cola: [
        'beatrice chocolate milk',
        'waterbridge chocolate initial',
        'waterbridge chocolate initial',
        'lindt lindor chocolate hearts',
        'kinder surprise chocolate heart',
        'lindt chocolate bars',
        'kinder chocolate',
        "hershey's chocolate",
        'merci chocolate candy'
        ],
        't butter': [ 'kraft peanut butter' ],
        pizza: [ 'mccain pizza pockets' ],
        lavender: [ 'bellisimo lavender knit pillow' ],
        fruits: [ 'e.d. smith triple fruits jam' ],
        haddock: [ 'janes™ ultimate breaded haddock' ],
        'chocolate candy': [ 'merci chocolate candy' ],
        'chocolate milk': [ 'beatrice chocolate milk' ],
        pudding: [ 'snack pack pudding cups' ],
        'chocolate bar': [ 'lindt chocolate bars' ],
        steaks: [ 'leadbetters cowboy steaks' ],
        slice: [ '227 g sliced white mushrooms' ],
        caramel: [ 'litehouse caramel dip' ],
        'nut butter': [ 'kraft peanut butter' ],
        'white mushroom': [ '227 g sliced white mushrooms' ],
        'heinz ketchup': [ 'heinz ketchup' ],
        bits: [ 'christie bits & bites or crispers' ],
        'cinnamon ': [ 'ferrara cinnamon hearts' ],
        'chicken strips': [ 'janes® pub style chicken strips' ],
        "hershey's kisses": [ "hershey's kisses" ],
        'black forest ham': [ 'gold label black forest ham' ]
    }

    const TESTfoodDict = {
        'all-purpose flour': [ 'giant value all-purpose flour' ],
        celery: [ 'celery' ],
        mushrooms: [ '227 g sliced white mushrooms' ],
        'green pepper': [ 'green peppers' ],
        shrimp: [ 'aqua star garlic & herb shrimp' ],
        mustard: [ "french's mustard" ],
        ketchup: [ 'heinz ketchup' ],
        avocado: [ 'avocados' ],
        'peanut butter': [ 'kraft peanut butter' ],
        peanuts: [ 'planters in-shell peanuts' ],
        oranges: [ '3 lb seedless oranges', '3 lb cara cara oranges' ],
        'cool whip': [ 'kraft cool whip' ],
        'cottage cheese': [ 'beatrice cottage cheese' ],
        sausage: [ 'schneiders smoked sausages' ],
        'all purpose flour': [ 'robin hood all purpose flour' ],
        coffee: [
        'nescafe coffee pods',
        'tim hortons coffee pods',
        'tim hortons coffee',
        'giant value coffee pods'
        ],
        'green peppers': [ 'green peppers' ],
        herbs: [ 'litehouse dried herbs' ],
        macaroni: [ 'kraft dinner macaroni & cheese' ],
        mushroom: [ '227 g sliced white mushrooms' ],
        'puff pastry': [ 'tenderflake puff pastry' ],
        'chicken wings': [ 'janes frozen chicken wings' ],
        fish: [ 'catch of the day frozen fish' ],
        'pasta sauce': [
        'bravo pasta sauce',
        'classico pasta sauce',
        'classico pasta sauce'
        ],
        avocados: [ 'avocados' ],
        sausages: [ 'schneiders smoked sausages' ],
        'miracle whip': [ 'kraft miracle whip spread' ],
        'white mushrooms': [ '227 g sliced white mushrooms' ],
        'bbq sauce': [ "bull's-eye bbq sauce" ],
        'table salt': [ 'windsor table salt' ],
        'iceberg lettuce': [ 'iceberg lettuce' ],
        candy: [ 'reese candy', 'fun dip candy' ],
        'salad dressing': [ 'kraft salad dressing', 'kraft salad dressing' ],
        'smoked sausage': [ 'schneiders smoked sausages' ],
        sweetener: [ 'splenda sweetener' ],
        cereal: [ "kellogg's cereal", "kellogg's cereal" ],
        'chocolate bars': [ 'lindt chocolate bars' ],
        soup: [ "campbell's chunky soup", "campbell's chunky soup" ],
        splenda: [ 'splenda sweetener' ],
        pizza: [ 'mccain pizza pockets' ],
        'chocolate milk': [ 'beatrice chocolate milk' ],
        pudding: [ 'snack pack pudding cups' ],
        caramel: [ 'litehouse caramel dip' ],
        'white mushroom': [ '227 g sliced white mushrooms' ],
        'heinz ketchup': [ 'heinz ketchup' ],
        'chicken strips': [ 'janes® pub style chicken strips' ],
        "hershey's kisses": [ "hershey's kisses" ],
        'black forest ham': [ 'gold label black forest ham' ]
    }

        const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        })
    //NEEEEDDDDDDDDDDD
        // const cleanFood = {};
        // // condense flyer item list
        // for (let mainKey in foodDictionary){
        //     let flyer_vals = [];
        //     for (let subKey in foodDictionary[mainKey]){
        //         let pair = mainKey.concat(" and ").concat(foodDictionary[mainKey][subKey]);
        //         const chatCompletion = await openai.chat.completions.create({
        //             model: "gpt-3.5-turbo",
        //             messages: [
        //             {"role": "system", "content": "Please respond with ONLY a boolean ('True' or 'False') indicating if these two items, an ingredient and a flyer item are equivalent in terms of cooking or in terms of ingredients:"},
        //             {"role": "user", "content": pair}
        //             ],
        //         });
        //             console.log(pair);
        //             let outputMes = chatCompletion.choices[0].message;
        //             console.log(chatCompletion.choices[0].message);
        //             let contentVal = outputMes.content;
        //             if (contentVal === "True"){
        //             flyer_vals.push(foodDictionary[mainKey][subKey]);
        //             };
        //         };
        //     if (flyer_vals.length > 0){
        //         cleanFood[mainKey] = flyer_vals;
        //     }
        // };
        // console.log(cleanFood);

        let cleanFoodArray = "";
        for (let key in  TESTfoodDict){
            let onSale = TESTfoodDict[key];

            for (let i = 0; i < onSale.length; i++) {
                cleanFoodArray = cleanFoodArray.concat(onSale[i]);
            }
        }
        console.log(cleanFoodArray);


        //get recommended ingredients
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are a helpful assistant that picks three items that would make a good recipe togethor from the given list, you only ever output the three items you pick seperated by commas, try and pick a variety of combinations"},
            {"role": "user", "content": "From this list of flyer items, pick 3 items which would make a well known recipe, avoid supplementary items like seasonings, butter, oil etc. output the three items in the following format. YOU SHOULD ONLY OUTPUT 3 items, 'ingredient1, ingredient2, ingredient3'.\n here is the list to pick from:" + cleanFoodArray}],
            temperature:randomValue,
        });
        console.log(chatCompletion.choices[0].message);
        let saleIngredients = chatCompletion.choices[0].message.content;
        console.log(saleIngredients);

        resolve(saleIngredients);
    });
}
// let saleIngreds = await clean();


const responses = [];  // Declare an array to store responses


let isValidRecipe = false;

function getRecipe(saleIng){
    // get recipes
    return new Promise(async (resolve) => {
        let success = false;
        while (!success) {
            try {
                const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{"role": "system", "content": "You are a helpful assistant that provides recipes that includes at least these three items." +  saleIng + "you follow the given format exaclty when outputting text"},
                {"role": "user", "content":
                `fill out the following format with a common recipe that includes the three items plus whatever necessary. MUST include,` + saleIng + `\n
                Respond exclusively in the following format:\n 
                Recipe title: title\\n 
                ingredients: output each ingredient on a newline\n ingredient1\\n ingredient2\\n etc..\n, make sure you include every ingredient mentioned in the recipe including the ones not specified, add the required amounts\n 
                instructions:\\n step one step two etc\\n
                cooking time: give the upper bound of the time in the form "xhxxm" exclusively, if the time is less than one hour it should be in form 0hxxm, ONLY xhxxm \\n
                serving size: an integer of how many people the recipe feeds \\n
                THE RECIPE MUST BE MADE FROM THE 3 ingredients!!!!!\n`}],
                temperature: randomValue,
                });
                let response = chatCompletion.choices[0].message.content;
                responses.push(response);  // Push each response into the array
                console.log(chatCompletion.choices[0].message);
                let resString = "";
                resString = responses.join('', ' ');
                console.log(resString);

                const title = resString.match(/Recipe title: (.+)/)[1];
                const ingredients = resString.match(/ingredients:\n([\s\S]+?)instructions:/)[1].trim();
                const instructions = resString.match(/instructions:\n([\s\S]+?)cooking time:/)[1].trim();
                const time = resString.match(/cooking time: (.+)/)[1];
                //const tags = resString.match(/tags: (.+)/)[1].split(', ').map(tag => tag.trim());
                const servingSize = parseInt(resString.match(/serving size: (\d+)/)[1]);

                console.log(title);
                console.log(ingredients);
                console.log(instructions);
                console.log(time);
                //console.log(tags);
                console.log(servingSize + "\n");

                //const isValidCookTime = /^[0-9]h[0-5]?[0-9]m$/.test(time);
                success = true;
                resolve([title, ingredients, instructions, time, servingSize]);
            } catch (error){
                //reject(new Error("Recipe not valid"));
                console.error("recipe didnt generate correctly, trying agian.", error);
                await getRecipe(saleIng);
            }
        }
    });
}
    // const chatCompletion = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{"role": "user", "content": "That is the correct format, keep doing future recipes this way, change the ingredients and recipes everytime"}],
    // })


async function runRecipeLoop() {
    let ingredFromClean = await clean();

    while (!isValidRecipe) {
        const stuff = await getRecipe(ingredFromClean);
        const [title, ingredients, instructions, time, servingSize] = stuff;
        
        //console.log(stuff);
        console.log("Recipe Title:", title);
        console.log("Ingredients:", ingredients);
        console.log("Instructions:", instructions);
        console.log("Cooking Time:", time);
        console.log("Serving Size:", servingSize);

        isValidRecipe = true;

        return { title, ingredients, instructions, time, servingSize };
    }
    process.exit();
}
const details = await runRecipeLoop();
function cleanIngs(ings) {
    // Remove '- ' and 'Ingredients:' from the ingredients
    const cleanedIngs = ings
        .replace(/- /g, '')
        .replace(/Ingredients:/gi, '')
        .replace(/\n/g, ', ')
        .trim();

    return cleanedIngs;
}

function cleanIns(ins) {
    // Remove '- ' and 'Ingredients:' from the ingredients
    const cleanedIns = ins
        .replace(/Instructions:/gi, '')
        .trim();

    return cleanedIns;
}

function cleanSize(s) {
    // Remove '- ' and 'Ingredients:' from the ingredients
    const cleanedSize = s;
    return cleanedSize + "";
}

function convertTimeToDesiredFormat(time) {
    // Check if time is already in the desired format (xhxxm)
    if (/^\d+h\d+m$/.test(time)) {
        return time;
    }

    // Check if time is in the format 0h20m (20 minutes)
    const matchWithHoursAndMinutes = time.match(/^(\d+)h(\d+)m \((\d+) hours (\d+) minutes\)$/);
    if (matchWithHoursAndMinutes) {
        const hours = parseInt(matchWithHoursAndMinutes[1]) + parseInt(matchWithHoursAndMinutes[3]);
        const minutes = parseInt(matchWithHoursAndMinutes[2]) + parseInt(matchWithHoursAndMinutes[4]);
        return `${hours}h${minutes}m`;
    }

    // If not in the desired format or 0h20m format, convert
    const minutesMatch = time.match(/^(\d+) minutes?$/);
    if (minutesMatch) {
        const minutes = minutesMatch[1];
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h${remainingMinutes}m`;
    }

    return time; // If none of the formats match, return the original time
}

// Example usage:
const originalTime = details.time;
const convertedTime = convertTimeToDesiredFormat(originalTime);
console.log("Converted Time:", convertedTime);

// Assuming recipeDetails is an object with ingredients property
const cleanedIngs = cleanIngs(details.ingredients);

console.log("Cleaned ingreds:", cleanedIngs);

const cleanedIns = cleanIns(details.instructions);

console.log("Cleaned instructions:", cleanedIns);


const cleanedSize = cleanSize(details.servingSize);

console.log("Cleaned size:", cleanedSize);


const docRef = await addDoc(collection(db, "recipes"), {
    recipeTitle: '',
    ingredients: cleanedIngs,
    instructions: cleanedIns,
    servingSize: cleanedSize,
    tags: 'AI',
    cookTime: convertedTime
})

console.log('Document added with ID: ', docRef.id)

process.exit();