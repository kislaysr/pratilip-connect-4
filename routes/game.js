var express = require('express');
var router = express.Router();
var Game = require('../models/game');


router.get('/', function (req, res, next) {
  res.json(req.game);
});


function checkWinner(board, row_, col_, turn, callback) {
  //check cols
  let visited = {}
  let col = parseInt(col_);
  let row = parseInt(row_)-1;
  //console.log(col, row);
  //check up
    let upco = 0;
  if(board[col].length>=4){
    for(var i = 0; i<6;i++){
      try {
        let item = board[col][i];
        if(item === turn){
          upco+=1;
        }else{
          upco = 0;
        }
        if(upco == 4){
          break;
        }
      } catch (error) {
        upco =0;
      }
      
    }
  }
  //check left
  let lefco = 0;
  for(var i =0;i<7;i++){
    try {
      if(board[i][row] === turn){
        lefco +=1;
      }else{
        lefco = 0;
      }
      if(lefco == 4){
        break;
      }
    } catch (error) {
      lefco =0;
    }
    
  }
  // check left diag
  let tempr = row;
  let tempc = col; 
  let ldiag = 0;
  while(tempc>=0 && tempr>=0){
    tempc-=1;
    tempr-=1;
  }  

  for(var i =tempr;i<6 && tempc<7;i++){
    try {
      if(board[tempc][i] === turn){
        ldiag +=1;
      }else{
        ldiag = 0;
      }
      if(ldiag == 4){
        break;
      }
    } catch (error) {
        ldiag =0;
    }
    
    tempc+=1
  }

  //right diag
  tempr = row;
  tempc = col; 
  rdiag = 0;
  while(tempc>=0 && tempr>=0 && tempr<6){
    tempc-=1;
    tempr+=1;
  }  
  for(var i =tempc;i<7 && tempr>=0;i++){
    try {
      if(board[i][tempr] === turn){
        rdiag +=1;
      }else{
        rdiag = 0;
      }
      if(rdiag == 4){
        break;
      }
      
    } catch (error) {
      rdiag = 0;
    }
    
    tempr-=1
  }

  if(upco==4 || lefco == 4 || ldiag == 4 || rdiag == 4){
    callback(true);
  }else{
    callback(false);
  }

}
router.get('/move/col/:colnum', function (req, res, next) {
  let payload = {
    "error": null,
    "body": {
      "message": "Valid"
    },
    "status": "success"
  }

  let col = req.params.colnum;

  Game.findOne({ _id: req.game._id }, (err, game) => {
    let moves = game.moves;
    let board = game.board;
    //console.log(board);
    //console.log(moves);
    let turn = game.turn;
    if (parseInt(col) > 6 || parseInt(col) < 0) {
      payload.body.message = "Invalid";
      res.json(payload);
    } else {
      if (game.winner === null) {
        if (board[parseInt(col)].length < 7) {
          
          moves.push(col);
          game.moves = moves;
          game.board[parseInt(col)].push(turn);
          //console.log(game.board)
          //game.board = board; 
          
          const row = game.board[parseInt(col)].length;
          
          checkWinner(board, row, col, turn, (status) => {

            if (status == true) {
              game.winner = turn;
              if (turn === '1') {
                payload.body.message = "Yellow Wins";
              } else {
                payload.body.message = "Red Wins";
              }
              //res.json(payload);

            } else {
              if (turn === '1') {
                game.turn = '2';
              } else {
                game.turn = '1';
              }

            }
            game.markModified('moves');
            game.markModified('board');
            game.markModified('winner');
            game.markModified('turn');
            game.save((err, game) => {
              if(err){
                console.log(err);
              }
              if (game) {
                //console.log(game);
                res.json(payload);
              }
            })

          })
        } else {
          payload.body.message = "Invalid";
          res.json(payload);
        }
      } else {
        payload.body.message = "Invalid";
        payload.status = "failed";
        res.json(payload);
      }
    }
  });




})

module.exports = router;
