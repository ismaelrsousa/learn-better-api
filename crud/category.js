const Joi = require('joi');

const express = require('express');

const router = express.Router();

const db = require("../database");

//? CATEGORY
//  CREATE
router.post('/', async function(req, res) {
  let category = req.body;

  let { error } = validateCategory(category);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.createCategory(category);

  res.send(result);
});

//  READ
router.get('/', async function(req, res) {
  let result = await db.readCategory();

  res.send(result[0]);
});

//  UPDATE
router.put('/:id', async function(req, res) {
  let category = req.body;
  let id = req.params.id;

  let { error } = validateCategory(category);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.updateCategory(category, id);

  res.send(result);
});

//  DELETE
router.delete('/:id', async function(req, res) {
  let id = req.params.id;

  let result = await db.deleteCategory(id);

  res.send(result);
});

function validateCategory(category) {
  let schema = {
    name: Joi.string().min(3).max(30).required(),
    tags: Joi.string(),
    status: Joi.number().required(),
    parent: Joi.number()
  }

  return Joi.validate(category, schema);
}

module.exports = router;