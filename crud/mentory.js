const Joi = require('joi');

const express = require('express');

const router = express.Router();

const db = require("../database");

//? MENTORY
//  CREATE
router.post('/', async function(req, res) {
  let mentory = req.body;

  let { error } = validateMentory(mentory);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.createMentory(mentory);

  res.send(result);
});

//  READ
router.get('/', async function(req, res) {
  let result = await db.readMentory();

  res.send(result[0]);
});

router.get('/:id', async function(req, res) {
  let id = req.params.id;
  let result = await db.searchMentory(id);

  res.send(result[0]);
});

//  UPDATE
router.put('/:id', async function(req, res) {
  let mentory = req.body;
  let id = req.params.id;

  let { error } = validateMentory(mentory);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.updateMentory(mentory, id);

  res.send(result);
});

//  DELETE
router.delete('/:id', async function(req, res) {
  let id = req.params.id;

  let result = await db.deleteMentory(id);

  res.send(result);
});

function validateMentory(mentory) {
  let schema = {
    mentor: Joi.number().required(),
    mentee: Joi.number().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date(),
    avaliation_mentor: Joi.number(),
    avaliation_mentee: Joi.number(),
    status: Joi.string().valid('0','1').required(),
    category: Joi.number()
  }

  return Joi.validate(mentory, schema);
}

module.exports = router;