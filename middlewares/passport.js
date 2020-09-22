var express = require('express');
var router = express.Router();
var Game = require('../models/game');

const auth = async(req, res, next) => {
    
  try {
      const uid = req.header('Authorization').replace('Bearer ', '')
     
      const game = await Game.findOne({ uid: uid})
      if (!game) {
          throw new Error()
      }
      req.game = game
      next()
  } catch (error) {
      res.status(401).send({ error: 'Uid not valid' })
  }

}
module.exports = auth

