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

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _util = __webpack_require__(1);

	var _util2 = _interopRequireDefault(_util);

	var _Deck = __webpack_require__(2);

	var _Deck2 = _interopRequireDefault(_Deck);

	var _Player = __webpack_require__(4);

	var _Player2 = _interopRequireDefault(_Player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	  Comparison of cards isn't something intrisic to a Deck. It is more a function of a game.
	  Our game is simple. High card wins. The game can have up to 49 players, because
	  anything more than that is a guaranteed tie for first... Approaching that limit
	  increases the liklihood of a tie, though.
	*/

	var Game = (function () {
	  function Game(options) {
	    _classCallCheck(this, Game);

	    this.options = {};
	    this.winner = null;
	    this.deck = new _Deck2.default();
	    this.players = [];

	    var defaultOptions = {
	      players: ['player1', 'player2'],
	      startImmediately: true
	    };

	    _util2.default.extendObj(this.options, defaultOptions, options);

	    this.setupPlayers();
	    if (this.options.startImmediately) {
	      this.playGame();
	    }
	  }

	  _createClass(Game, [{
	    key: 'setupPlayers',
	    value: function setupPlayers() {
	      var players = this.options.players;

	      for (var i = 0; i < players.length; i++) {
	        this.players.push(new _Player2.default(players[i]));
	      }

	      return this.players;
	    }
	  }, {
	    key: 'playGame',
	    value: function playGame() {
	      this.deck.shuffle();
	      this.deal();
	      this.showDown();
	      this.announceWinner();
	    }

	    // Each player gets one card in this game

	  }, {
	    key: 'deal',
	    value: function deal() {
	      var cardsDealt = [];
	      for (var i = 0; i < this.players.length; i++) {
	        var card = this.deck.drawCards(1)[0];
	        cardsDealt.push(card);
	        this.players[i].setCard(card);
	      }

	      return cardsDealt;
	    }

	    // Players cards are compared. High card is the winner. Multiple winners (ties) are possible.

	  }, {
	    key: 'showDown',
	    value: function showDown() {
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
	    }
	  }, {
	    key: 'announceWinner',
	    value: function announceWinner() {
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
	  }]);

	  return Game;
	})();

	// The dog and cats know how to play too, apparently

	window.Game = Game;
	new Game({ players: ['Ryan', 'Olivia', 'Bailey', 'Gus', 'Alex'] });

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Util = (function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }

	  _createClass(Util, null, [{
	    key: 'extendObj',
	    value: function extendObj(out) {
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
	  }]);

	  return Util;
	})();

	exports.default = Util;

	// Attach the .equals method to Array's prototype to call it on any array

	Array.prototype.equals = function (array) {
	  // If the other array is a falsy value, return
	  if (!array) {
	    return false;
	  }

	  // Compare lengths - can save a lot of time
	  if (this.length != array.length) {
	    return false;
	  }
	  for (var i = 0, l = this.length; i < l; i++) {
	    // Check if we have nested arrays
	    if (this[i] instanceof Array && array[i] instanceof Array) {
	      // Recurse into the nested arrays
	      if (!this[i].equals(array[i])) {
	        return false;
	      }
	    } else if (this[i] != array[i]) {
	      // Warning - two different object instances will never be equal: {x:20} != {x:20}
	      return false;
	    }
	  }
	  return true;
	};
	// Hide method from for-in loops
	Object.defineProperty(Array.prototype, 'equals', { enumerable: false });

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Card = __webpack_require__(3);

	var _Card2 = _interopRequireDefault(_Card);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	  Decks create more decks when they are cut, so we need the option to pass an
	  existing array of cards.
	*/

	var Deck = (function () {
	  function Deck(options) {
	    _classCallCheck(this, Deck);

	    this.options = options ? options : {};
	    this.cards = [];

	    if (this.options.cards) {
	      this.cards = this.options.cards;
	    } else {
	      this._addCards();
	    }
	  }

	  _createClass(Deck, [{
	    key: '_addCards',
	    value: function _addCards() {
	      var suits = ['S', 'C', 'D', 'H'];
	      var faceValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

	      // We need one value of every suit. Mixed-type array is a nice nicety here.
	      for (var i = 0; i < suits.length; i++) {
	        for (var x = 0; x < faceValues.length; x++) {
	          var card = new _Card2.default(faceValues[x], suits[i]);
	          this.cards.push(card);
	        }
	      }

	      return this.cards;
	    }

	    // Using the Durstenfeld shuffle - https://goo.gl/OxCR18

	  }, {
	    key: 'shuffle',
	    value: function shuffle() {
	      var cards = this.cards;

	      for (var i = cards.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = cards[i];
	        cards[i] = cards[j];
	        cards[j] = temp;
	      }

	      this.cards = cards;
	      return this.cards;
	    }

	    /*
	      So long as there are enough cards in the deck, a request to draw a certain
	      amount will be honored. Otherwise, make a valid request.
	    */

	  }, {
	    key: 'drawCards',
	    value: function drawCards(numCards) {
	      if (this.cards.length - numCards < 0) {
	        throw 'There aren\'t enough cards left in the deck to draw ' + numCards + ' card(s)';
	      }

	      var cards = [];
	      for (var i = 0; i < numCards; i++) {
	        cards.push(this.cards.pop());
	      }

	      return cards;
	    }
	  }, {
	    key: 'cut',
	    value: function cut(numCardsIn) {
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
	  }]);

	  return Deck;
	})();

	exports.default = Deck;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	  Cards have a face value, numeric value, and a suit.
	  I dislike the aesthetic of switch statements, heh.
	*/

	var Card = (function () {
	  function Card(faceValue, suit) {
	    _classCallCheck(this, Card);

	    this.value = null;
	    this.suit = suit.toUpperCase();
	    this.faceValue = faceValue;
	    this._setValue(faceValue);
	  }

	  _createClass(Card, [{
	    key: '_setValue',
	    value: function _setValue(faceValue) {
	      var faceValueInt = parseInt(faceValue);
	      var isNumeric = !isNaN(faceValueInt);
	      var faceCards = ['J', 'Q', 'K', 'A'];

	      if (isNumeric) {
	        this.value = faceValueInt;
	      } else if (faceCards.indexOf(faceValue) !== -1) {
	        this.faceValue = faceValue.toUpperCase();
	        var faceCardValue = null;

	        switch (this.faceValue) {
	          case 'J':
	            {
	              this.value = 11;
	              break;
	            }
	          case 'Q':
	            {
	              this.value = 12;
	              break;
	            }
	          case 'K':
	            {
	              this.value = 13;
	              break;
	            }
	          case 'A':
	            {
	              this.value = 14;
	              break;
	            }
	        }
	      } else {
	        throw 'Invalid input: When creating an instance of a Card, you must pass a valid value';
	      }

	      return this.value;
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      return this.value;
	    }
	  }, {
	    key: 'toPlainEnglish',
	    value: function toPlainEnglish() {
	      var card = this.getCardValueName();
	      var suit = this.getSuitName();

	      return card + ' of ' + suit;
	    }
	  }, {
	    key: 'getCardValueName',
	    value: function getCardValueName() {
	      var cardName = null;
	      switch (this.faceValue) {
	        case 'J':
	          {
	            cardName = 'Jack';
	            break;
	          }
	        case 'Q':
	          {
	            cardName = 'Queen';
	            break;
	          }
	        case 'K':
	          {
	            cardName = 'King';
	            break;
	          }
	        case 'A':
	          {
	            cardName = 'Ace';
	            break;
	          }
	        default:
	          {
	            cardName = this.faceValue;
	            break;
	          }
	      }

	      return cardName;
	    }
	  }, {
	    key: 'getSuitName',
	    value: function getSuitName() {
	      var suitName = null;
	      switch (this.suit) {
	        case 'S':
	          {
	            suitName = 'Spades';
	            break;
	          }
	        case 'C':
	          {
	            suitName = 'Clubs';
	            break;
	          }
	        case 'D':
	          {
	            suitName = 'Diamonds';
	            break;
	          }
	        case 'H':
	          {
	            suitName = 'Hearts';
	            break;
	          }
	        default:
	          {
	            break;
	          }
	      }

	      return suitName;
	    }
	  }]);

	  return Card;
	})();

	exports.default = Card;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = (function () {
	  function Player(name) {
	    _classCallCheck(this, Player);

	    this.name = name;
	    this.card = null;
	  }

	  _createClass(Player, [{
	    key: "getCard",
	    value: function getCard() {
	      return this.card;
	    }
	  }, {
	    key: "setCard",
	    value: function setCard(card) {
	      this.card = card;
	      return this.card;
	    }
	  }, {
	    key: "showCard",
	    value: function showCard() {
	      return this.card.toPlainEnglish();
	    }
	  }]);

	  return Player;
	})();

	exports.default = Player;

/***/ }
/******/ ]);