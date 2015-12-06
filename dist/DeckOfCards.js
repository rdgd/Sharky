/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Deck = __webpack_require__(1);
	var Player = __webpack_require__(3);
	var util = __webpack_require__(4);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Card = __webpack_require__(2);

	/*
	  Decks create more decks when they are cut, so we need the option to pass an
	  existing array of cards.
	*/
	function Deck (options) {
	  this.options = options ? options : {};
	  this.cards = [];

	  if (this.options.cards) {
	    this.cards = this.options.cards;
	  } else {
	    this._addCards();
	  }
	}

	Deck.prototype = {
	  _addCards: function () {
	    var suits = ['S', 'C', 'D', 'H'];
	    var faceValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

	    // We need one value of every suit. Mixed-type array is a nice nicety here.
	    for (var i = 0; i < suits.length; i++) {
	      for (var x = 0; x < faceValues.length; x++) {
	        var card = new Card(faceValues[x], suits[i]);
	        this.cards.push(card);
	      }
	    }

	    return this.cards;
	  },

	  // Using the Durstenfeld shuffle - https://goo.gl/OxCR18
	  shuffle: function () {
	    var cards = this.cards;

	    for (var i = cards.length - 1; i > 0; i--) {
	      var j = Math.floor(Math.random() * (i + 1));
	      var temp = cards[i];
	      cards[i] = cards[j];
	      cards[j] = temp;
	    }

	    this.cards = cards;
	    return this.cards;
	  },

	  /*
	    So long as there are enough cards in the deck, a request to draw a certain
	    amount will be honored. Otherwise, make a valid request.
	  */
	  drawCards: function (numCards) {
	    if (this.cards.length - numCards < 0) {
	      throw 'There aren\'t enough cards left in the deck to draw ' + numCards + ' card(s)';
	    }

	    var cards = [];
	    for (var i = 0; i < numCards; i++) {
	      cards.push(this.cards.pop());
	    }

	    return cards;
	  },

	  cut: function (numCardsIn) {
	    // Cut in half by default
	    var cutPoint = numCardsIn ? numCardsIn : 26;
	    var cards = this.cards;
	    var part1 = cards.slice(0, numCardsIn);
	    var part2 = cards.slice(numCardsIn);
	    // This deck's cards are now represented by two sub-decks
	    // Envision two piles of cards on a table
	    this.cards = [new Deck({ cards: part1 }), new Deck({ cards: part2 })];
	    return this.cards;
	  }
	};

	module.exports = Deck;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	  Cards have a face value, numeric value, and a suit.
	  I dislike the aesthetic of switch statements, heh.
	*/
	function Card (faceValue, suit) {
	  this.value = null;
	  this.suit = suit.toUpperCase();
	  this.faceValue = faceValue;
	  this._setValue(faceValue);
	}

	Card.prototype = {
	  _setValue: function (faceValue) {
	    var faceValueInt = parseInt(faceValue);
	    var isNumeric = !isNaN(faceValueInt);
	    var faceCards = ['J', 'Q', 'K', 'A'];

	    if (isNumeric) {
	      this.value = faceValueInt;
	    } else if (faceCards.indexOf(faceValue) !== -1) {
	      this.faceValue = faceValue.toUpperCase();
	      var faceCardValue = null;

	      switch (this.faceValue) {
	        case 'J': {
	          this.value = 11;
	          break;
	        }
	        case 'Q': {
	          this.value = 12;
	          break;
	        }
	        case 'K': {
	          this.value = 13;
	          break;
	        }
	        case 'A': {
	          this.value = 14;
	          break;
	        }
	      }
	    } else {
	      throw 'Invalid input: When creating an instance of a Card, you must pass a valid value';
	    }

	    return this.value;
	  },

	  getValue: function () {
	    return this.value;
	  },

	  toPlainEnglish: function () {
	    var card = this.getCardValueName();
	    var suit = this.getSuitName();

	    return card + ' of ' + suit;
	  },

	  getCardValueName: function () {
	    var cardName = null;
	    switch (this.faceValue) {
	      case 'J': {
	        cardName = 'Jack';
	        break;
	      }
	      case 'Q': {
	        cardName = 'Queen';
	        break;
	      }
	      case 'K': {
	        cardName = 'King';
	        break;
	      }
	      case 'A': {
	        cardName = 'Ace';
	        break;
	      }
	      default: {
	        cardName = this.faceValue;
	        break;
	      }
	    }

	    return cardName;
	  },

	  getSuitName: function () {
	    var suitName = null;
	    switch (this.suit) {
	      case 'S': {
	        suitName = 'Spades';
	        break;
	      }
	      case 'C': {
	        suitName = 'Clubs';
	        break;
	      }
	      case 'D': {
	        suitName = 'Diamonds';
	        break;
	      }
	      case 'H': {
	        suitName = 'Hearts';
	        break;
	      }
	      default: { break; }
	    }

	    return suitName;
	  }
	};

	module.exports = Card;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Player (name) {
	  this.name = name;
	  this.card = null;
	}

	Player.prototype = {
	  getCard: function () {
	    return this.card;
	  },

	  setCard: function (card) {
	    this.card = card;
	    return this.card;
	  },

	  showCard: function () {
	    return this.card.toPlainEnglish();
	  }
	};

	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports) {

	// Attach the .equals method to Array's prototype to call it on any array
	Array.prototype.equals = function (array) {
	  // If the other array is a falsy value, return
	  if (!array) { return false; }

	  // Compare lengths - can save a lot of time
	  if (this.length != array.length) { return false; }
	  for (var i = 0, l = this.length; i < l; i++) {
	    // Check if we have nested arrays
	    if (this[i] instanceof Array && array[i] instanceof Array) {
	      // Recurse into the nested arrays
	      if (!this[i].equals(array[i])) { return false; }
	    } else if (this[i] != array[i]) {
	      // Warning - two different object instances will never be equal: {x:20} != {x:20}
	      return false;
	    }
	  }
	  return true;
	};
	// Hide method from for-in loops
	Object.defineProperty(Array.prototype, 'equals', { enumerable: false });

	module.exports = {
	  extend: function (out) {
	    out = out || {};

	    for (var i = 1; i < arguments.length; i++) {
	      if (!arguments[i]) {
	        continue;
	      }

	      for (var key in arguments[i]) {
	        if (arguments[i].hasOwnProperty(key)) {
	          out[key] = arguments[i][key];
	        }
	      }
	    }

	    return out;
	  }
	};


/***/ }
/******/ ]);