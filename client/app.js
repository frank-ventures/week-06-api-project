// we need to give the form an event listener
// we need to run a function which interacts with our server, sending it the prompt
// we need to display the response from the GPT once we've received it

// Selecting elements from our DOM
const myForm = document.getElementById("promptForm");
const responsesContainer = document.getElementById("responsesContainer");

// Adding an event listener to our form
myForm.addEventListener("submit", sendChatRequest);

async function sendChatRequest(event) {
  //   console.log(event);
  event.preventDefault();
  const userPrompt = event.target.promptInput.value;
  console.log("the prompt is:", userPrompt);

  const response = await fetch("http://localhost:8080/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userPrompt }),
  });

  // Getting data back from the server
  const data = await response.json();
  console.log("The data received back is", data);
  // Adding a <p> tag to the page, and putting the server text response in that <p> tag
  const responseP = document.createElement("p");
  responseP.textContent = data;
  responsesContainer.appendChild(responseP);
}
