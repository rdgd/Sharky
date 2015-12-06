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
