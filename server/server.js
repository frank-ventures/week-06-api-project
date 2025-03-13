// Imports for our project
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Next, we're going to write some "boiler plate" code which helps to set up our server
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Declare a variable which lets us start using the OpenAI API
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// What we need next is a couple of endpoints so that our server can be interacted with.
// We'll set up a simple GET endpoint.
// Then we'll set up the POST endpoint which will receive our prompt
// We'll also make it so that our server listens on port 8080

app.get("/", function (request, response) {
  response.json({ message: "There's nothing to see here, move along please" });
});

app.post("/chat", async function (request, response) {
  //console.log("the prompt:", request.body.userPrompt);
  const userPrompt = request.body.userPrompt;
  console.log("the user prompt is:", userPrompt);

  // Error handling to make sure that our user doesn't send an empty request to the API which costs us money!
  if (!userPrompt) {
    console.log("there is no user prompt");
    response.json("No prompt given");
  }

  // Here is where we are going to send the userPrompt to OpenAI API
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // here we choose which GPT version to use
    messages: [
      { role: "system", content: "You are a very helpful assistant!" }, // Here, we tell the GPT about itself
      { role: "user", content: userPrompt }, // Here, we give the GPT the user prompt
    ],
    store: true, // What this does NOT do is remember previous requests and responses.
  });

  console.log("completion:", completion);
  console.log("the GPT response itself", completion.choices[0].message.content);

  // Here is where we send something back to the client:
  response.json(completion.choices[0].message.content);
});

app.listen(8080, function () {
  console.log("Running on port 8080");
});
