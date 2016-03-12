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

	window.Deck = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AbstractDeck2 = __webpack_require__(2);

	var _AbstractDeck3 = _interopRequireDefault(_AbstractDeck2);

	var _Card = __webpack_require__(4);

	var _Card2 = _interopRequireDefault(_Card);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/*
	  Decks create more decks when they are cut, so we need the option to pass an
	  existing array of cards.
	*/

	var Deck = function (_AbstractDeck) {
	  _inherits(Deck, _AbstractDeck);

	  function Deck(options) {
	    _classCallCheck(this, Deck);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Deck).call(this));

	    options = options ? options : {};
	    _this._addCards(options.cards);
	    return _this;
	  }

	  _createClass(Deck, [{
	    key: '_addCards',
	    value: function _addCards(cards) {
	      var suits = ['S', 'C', 'D', 'H'];
	      var faceValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

	      if (!this.cards) {
	        this.cards = [];
	      }
	      if (cards) {
	        this.cards = cards;
	        return cards;
	      }
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
	}(_AbstractDeck3.default);

	exports.default = Deck;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AbstractClass2 = __webpack_require__(3);

	var _AbstractClass3 = _interopRequireDefault(_AbstractClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AbstractDeck = function (_AbstractClass) {
	  _inherits(AbstractDeck, _AbstractClass);

	  function AbstractDeck() {
	    _classCallCheck(this, AbstractDeck);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractDeck).call(this, {
	      methods: ['shuffle', 'drawCards', 'cut']
	    }));
	  }

	  return AbstractDeck;
	}(_AbstractClass3.default);

	exports.default = AbstractDeck;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AbstractClass = function () {
	  function AbstractClass(contract) {
	    _classCallCheck(this, AbstractClass);

	    // An abstract class does us no good if it is empty. Must have contract.
	    if (!contract) {
	      return false;
	    }

	    //  We must always have the following three pieces.
	    var implementation = Object.getPrototypeOf(this);
	    var definition = Object.getPrototypeOf(implementation);
	    var enforcer = Object.getPrototypeOf(definition);

	    /*
	      To minimize abstract class definition footprint,
	      we set these attributes for the developer.
	    */
	    definition.methods = !contract.methods ? [] : contract.methods;
	    definition.attributes = !contract.attributes ? [] : contract.attributes;

	    // Using the name of this class elsewhere is confusing
	    if (this.constructor.name === enforcer.constructor.name) {
	      throw 'You may not name your class "' + this.constructor.name + '"';
	    }

	    /*
	      The abstract class definition and this class cannot be instatiated directly
	      or in other words, the developer must use an appropriately named implementation
	    */
	    if (this.constructor === AbstractClass || this.constructor === definition.constructor) {
	      throw 'You may not instantiate an abstract class directly.';
	    }

	    /*
	      If any setup needs to be done before an integrity check, you may do so
	      by implementing the static methods preMethodCheck and preAttrCheck in your
	      class definition
	    */
	    if (definition.constructor.preMethodCheck) {
	      definition.constructor.preMethodCheck.call(Object.getPrototypeOf(this));
	    }
	    this.checkMethods();

	    if (definition.constructor.preAttrCheck) {
	      definition.constructor.preAttrCheck.call(Object.getPrototypeOf(this));
	    }
	    this.checkAttrs();
	  }

	  /*
	    Iterating over the abstract class definition's required methods, and checking
	    the implementation for them.
	  */


	  _createClass(AbstractClass, [{
	    key: 'checkMethods',
	    value: function checkMethods() {
	      var implemented = true;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.getPrototypeOf(this).methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var method = _step.value;

	          implemented = this[method];
	          if (!implemented) {
	            throw 'You must implement the method "' + method + '" specified by the abstract class';
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    /*
	      Abstract properties are not common, but I figured I would create the option
	      for them, should somebody find it useful. Kind of like C# without enforcing
	      a getter function.
	    */

	  }, {
	    key: 'checkAttrs',
	    value: function checkAttrs() {
	      var implemented = true;
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = Object.getPrototypeOf(this).attributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var property = _step2.value;

	          implemented = Object.getPrototypeOf(this).hasOwnProperty(property);
	          if (!implemented) {
	            throw 'You must implement the property "' + property + '" specified by the abstract class';
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }]);

	  return AbstractClass;
	}();

	exports.default = AbstractClass;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	  Cards have a face value, numeric value, and a suit.
	  I dislike the aesthetic of switch statements, heh.
	*/

	var Card = function () {
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
	}();

	exports.default = Card;

/***/ }
/******/ ]);