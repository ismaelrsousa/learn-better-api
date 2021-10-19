const Joi = require('joi');

const express = require('express');

const router = express.Router();

const db = require("../database");

//? USERS
//  CREATE
router.post('/', async function(req, res) {
  let user = req.body;

  let { error } = validateUser(user);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.createUser(user);

  res.send(result);
});

//  READ
router.get('/', async function(req, res) {
  let result = await db.readUsers();

  res.send(result[0]);
});

//  UPDATE
router.put('/:id', async function(req, res) {
  let user = req.body;
  let id = req.params.id;

  let { error } = validateUser(user);

  if (error) return res.status(400).send(error.details[0].message);

  let result = await db.updateUser(user, id);

  res.send(result);
});

//  DELETE
router.delete('/:id', async function(req, res) {
  let id = req.params.id;

  let result = await db.deleteUser(id);

  res.send(result);
});

function validateUser(user) {
  let schema = {
    name: Joi.string().min(3).max(100).required(),
    birthdate: Joi.date().max('now').required(),
    // cpf: Joi.string().pattern(new RegExp('/(\d{3})(\d{3})(\d{3})(\d{2})/')).required(),
    cpf: Joi.string().required(),
    email: Joi.string().required(),
    // cellphone: Joi.string().pattern(new RegExp('^[1-9]{2}(9[1-9])[0-9]{3}[0-9]{4}$')).required(),
    cellphone: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().required(),
    avaliation: Joi.number().min(0).max(10).integer().required(),
    resume: Joi.string(),
    type: Joi.string()
  }

  return Joi.validate(user, schema);
}

module.exports = router;