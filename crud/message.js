const Joi = require('joi');

const express = require('express');

const router = express.Router();

const db = require("../database");

//? MESSAGE
//  CREATE
router.post('/', async function(req, res) {
  let message = req.body;

  let { error } = validateMessage(message);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.createMessage(message);

  res.send(result);
});

//  READ
router.get('/', async function(req, res) {
  let result = await db.readMessage();

  res.send(result[0]);
});

//  UPDATE
router.put('/:id', async function(req, res) {
  let message = req.body;
  let id = req.params.id;

  let { error } = validateMessage(message);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.updateMessage(message, id);

  res.send(result);
});

//  DELETE
router.delete('/:id', async function(req, res) {
  let id = req.params.id;

  let result = await db.deleteMessage(id);

  res.send(result);
});

function validateMessage(message) {
  let schema = {
    author: Joi.number().required(),
    destiny: Joi.number().required(),
    message: Joi.string().required()
  }

  return Joi.validate(message, schema);
}

module.exports = router;