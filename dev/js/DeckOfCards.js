var Deck = require('./Deck.js');
var Player = require('./Player.js');
var util = require('./util.js');

/*
  Comparison of cards isn't something intrisic to a Deck. It is more a function of a game.
  Our game is simple. High card wins. The game can have up to 49 players, because
  anything more than that is a guaranteed tie for first... Approaching that limit
  increases the liklihood of a tie, though.
*/
function Game (options) {
  this.options = {};
  this.winner = null;
  this.deck = new Deck();
  this.players = [];

  var defaultOptions = {
    players: ['player1', 'player2'],
    startImmediately: true
  };

  util.extend(this.options, defaultOptions, options);

  this.setupPlayers();
  if (this.options.startImmediately) { this.playGame(); }
}

Game.prototype = {
  setupPlayers: function () {
    var players = this.options.players;

    for (var i = 0; i < players.length; i++) {
      this.players.push(new Player(players[i]));
    }

    return this.players;
  },

  playGame: function () {
    this.deck.shuffle();
    this.deal();
    this.showDown();
    this.announceWinner();
  },

  // Each player gets one card in this game
  deal: function () {
    var cardsDealt = [];
    for (var i = 0; i < this.players.length; i++) {
      var card = this.deck.drawCards(1)[0];
      cardsDealt.push(card);
      this.players[i].setCard(card);
    }

    return cardsDealt;
  },

  // Players cards are compared. High card is the winner. Multiple winners (ties) are possible.
  showDown: function () {
    var winningCardValue = 0;
    var winner = null;

    for (var i = 0; i < this.players.length; i++) {
      var player = this.players[i];
      var card = player.getCard();
      console.log(card);
      var cardValue = card.getValue();
      if (cardValue > winningCardValue) {
        winningCardValue = cardValue;
        winner = player;
      } else if (cardValue === winningCardValue) {
        if (winner instanceof Array) {
          winner.push(player);
        } else {
          winner = [winner, player];
        }
      }
    }

    this.winner = winner;
    return this.winner;
  },

  announceWinner: function () {
    if (this.winner instanceof Array) {
      console.log('It was a tie!');
      for (var i = 0; i < this.winner.length; i++) {
        var winnerName = this.winner[i].name;
        var winnerCard = this.winner[i].showCard();
        console.log(winnerName + ' shows a ' + winnerCard);
      }
    } else {
      console.log(this.winner.name + ' won with a ' + this.winner.showCard());
    }
  }
};

// The dog and cats know how to play too, apparently
new Game({ players: ['Ryan', 'Olivia', 'Bailey', 'Gus', 'Alex'] });
