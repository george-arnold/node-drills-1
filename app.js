const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req,res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req,res) => {
  res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req,res)=> {
  res.send(' pineapple pizza');
})

app.get('/echo', (req,res)=> {
  const responseText =  `Here are some details
  baseUrl: ${req.baseUrl}
  host: ${req.hostname}
  path: ${req.path}
  body: ${req.body}
  cookies: ${req.cookies}
  protocol: ${req.protocol}`;
  
  res.send(responseText);
})

app.get('/query', (req,res)=>{
  console.log(req.query);
  res.end();
})
app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race, thanks');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  const num1 = parseInt(req.query.a,10);
  const num2 = parseInt(req.query.b,10);
  const num3 = num1 + num2;
  res.send(`The sum of ${num1} and ${num2} is ${num3}`)



})

app.get('/cipher', (req,res)=> {
  const text = req.query.text;// gets text from user input
  const map = Array.prototype.map; //idk its copied from Google, it doesnt work without it tho
  const textAsArray = map.call(text, eachChar => {
    return `${eachChar}`; //seperates the text into individual characters stored in an array
  });
  const getValueofText= textAsArray.map( letter => letter.charCodeAt(0)); //converts the text charCode nums

  const shift = parseInt(req.query.shift,10); //gets the amount to shift the values from user, converts to num

  const updatedArrayValues = getValueofText.map( number => number + shift); //adds the user shift value to the charCode num
  const shiftedText = updatedArrayValues.map(number => String.fromCharCode(number)); //turns the numbers back into a string

  res.send (shiftedText.join("")); //joins the string back together
})
app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
})