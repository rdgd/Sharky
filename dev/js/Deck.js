import AbstractDeck from './AbstractDeck.js';
import Card from './Card.js';

/*
  Decks create more decks when they are cut, so we need the option to pass an
  existing array of cards.
*/
class Deck extends AbstractDeck {
  constructor (options) {
    super();
    options = options ? options : {};
    this._addCards(options.cards);
  }

  _addCards (cards) {
    var suits = ['S', 'C', 'D', 'H'];
    var faceValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

    if (!this.cards) { this.cards = []; }
    if (cards) {
      this.cards = cards;
      return cards;
    }
    // We need one value of every suit. Mixed-type array is a nice nicety here.
    for (var i = 0; i < suits.length; i++) {
      for (var x = 0; x < faceValues.length; x++) {
        var card = new Card(faceValues[x], suits[i]);
        this.cards.push(card);
      }
    }

    return this.cards;
  }

  // Using the Durstenfeld shuffle - https://goo.gl/OxCR18
  shuffle () {
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
  drawCards (numCards) {
    if (this.cards.length - numCards < 0) {
      throw 'There aren\'t enough cards left in the deck to draw ' + numCards + ' card(s)';
    }

    var cards = [];
    for (var i = 0; i < numCards; i++) {
      cards.push(this.cards.pop());
    }

    return cards;
  }

  cut (numCardsIn) {
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
}

export default Deck;
