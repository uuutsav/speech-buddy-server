import { AssemblyAI } from "assemblyai";
import dotenv from 'dotenv';
dotenv.config();

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_API_KEY,
});


export const transcriptModule = async (audioURL) => {
  console.log(audioURL);

  let transcript = await client.transcripts.transcribe({
    audio: audioURL,
  });

  const processedData = transcript.text;
  // console.log(processedData);

  return processedData;
};
