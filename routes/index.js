var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');

var Game = require('../models/game');


/* GET home page. */
router.get('/start', function(req, res, next) {
  const id = uniqid();

  let payload = {
    "error" : null,
    "body" : {
      "message": "Ready",
      "uid"  :id
    },
    "status": "success"
  }

  let game = new Game();
  game.uid = id;
  game.moves = [];
  game.board = [[],[],[],[],[],[],[]];
  game.turn = "1";
  game.winner = null;
  game.save((err, game)=>{
    if(!game){
      payload["error"] = err;
      payload["body"] = null;
      payload["status"] = "failed";
      res.json(payload);
    }
    else{
      res.json(payload);
    }
    
  });

  
});

module.exports = router;
