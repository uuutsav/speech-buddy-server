import express from 'express';
const app = express();
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import multer from 'multer';
import { transcriptModule } from './assemblyAI.mjs';
import { compare, correctArr, incorrectArr, missedArr } from './rate.mjs'

dotenv.config();
app.use(bodyParser.json());

const port = 5000;

let generatedString = "";

// Initialize the Generative Model (Google AI) (v1.1)
// Google cloud account not getting verified, look for alternatives 
/*
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const model = genAI.getGenerativeModel({ model: "models/gemini-pro"})

async function run() {
    const prompt = "Tell me a joke";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

}

run();
*/

var count = 0;
const getRandomInt = (a, b) => {
  // Generate random integer between a and b (inclusive)
  const rand = Math.floor(Math.random() * b) + a;
  return rand;
}
const chapter = getRandomInt(1, 18);
let shlok_number = 1;

const getDataFromAPI = async () => {
  // src = https://bhagavadgitaapi.in/#get-slokchsl
  const API_Url = "https://bhagavadgitaapi.in/slok/" + chapter + "/" + shlok_number + "/";
  // console.log(API_Url)

  try {
    const shlok = await axios.get(API_Url);
    // console.log(shlok.data.gambir.et);
    generatedString = shlok.data.san.et
    if (generatedString.length < 100) {
      generatedString = shlok.data.gambir.et
    }
    console.log(generatedString);
    shlok_number++;
  } catch (error) {
    console.log("Error in fetching data from API\n\n" + error);
    getDataFromAPI()
  }
}

// Configure Multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get("/api", (req, resp) => {
  resp.json({
    "inData": ['a', 'b']
  });
})

app.get("/generatePara", async (req, resp) => {
  await getDataFromAPI();

  resp.json({
    text: generatedString
  })
});
app.get("/generateChuck", async (req, resp) => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    generatedString = response.data.value;
    console.log(generatedString);
  } catch (error) {
    console.log("Error in fetching data from API\n\n" + error);
    setTimeout(async () => {
      try {
        const response = await axios.get("https://api.chucknorris.io/jokes/random");
        generatedString = response.data.value;
        console.log(generatedString);
      } catch (error) {
        console.log(error)
      }
    }, 1230);
  }

  resp.json({
    text: generatedString
  })
});
app.get("/generateChuckSearch", async (req, resp) => {
  try {
    const search = "cat"
    const url = "https://api.chucknorris.io/jokes/search?query=" + search;
    let response = await axios.get(url);
    let index = 0;
    if (response.data.total > 0) {
      // generatedString = response.data.value;
      index = parseInt(Math.random(0, response.data.total) * 10);
      generatedString = response.data.result[index].value;
    } else {
      // no search result
      response = await axios.get("https://api.chucknorris.io/jokes/random");
      generatedString = response.data.value;
    }
    console.log(generatedString);

  } catch (error) {
    console.log("Error in fetching data from API\n\n" + error);

  }

  resp.json({
    text: generatedString
  })
})

app.post('/transcribeAudio', upload.single('audio'), async (req, resp) => {
  const audioBlob = req.file.buffer;
  console.log("Generated Text: ", generatedString)

  const transcripts = await transcriptModule(audioBlob)
  console.log("Transcripts: ", transcripts);

  compare(generatedString, transcripts);

  const result = {
    message: "Hehe",
    correctArr: correctArr,
    incorrectArr: incorrectArr,
    missedArr: missedArr
  }
  console.log(result)

  resp.status(200).send(result);
})


app.listen(port, () => {
  console.log("Server started at port: " + port);
});