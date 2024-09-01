import express from 'express'
import data from '../data/Facts.mjs'
import { getRandomInt } from '../utils/RandomIntGenerator.mjs';

const router = express.Router();

router.get('/generate', (req, resp) => {
    const rand = getRandomInt(0, data.length -1)
    const sentence = data[rand];
    resp.status(200).json({
        text: sentence
    })
})

export default router