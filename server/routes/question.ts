import Express, { Router } from 'express';
import Database from '../models/Database';
import {QuestionModel} from '../models/QuestionDb';

//define all routes
const question = (router: Router) => {
    router.get('/question', getQuestion);
    router.post('/question/:id', postQuestion);
};

const db = new Database('../data/QuestionDb.db');

//returns a random question
const getQuestion = async (req, res) => {

    const keys = await db.Questions?.getKeys();
    const key_index = Math.floor(Math.random() * keys.length);
    const data = await db.Questions?.get(key_index);
    res.json({data});
};

const postQuestion = async(req, res) => {
    const model: QuestionModel = req.body as QuestionModel;

    //TODO: save response to DB

    //return model as response to caller
    res.json({model});
};

export default question;
