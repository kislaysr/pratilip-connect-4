var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    uid : String,
    moves : JSON,
    board: JSON,
    turn: String,
    winner: String
})


module.exports = mongoose.model('Game', gameSchema)








