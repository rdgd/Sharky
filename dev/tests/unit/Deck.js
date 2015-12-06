var Deck = require('../../js/Deck.js');

describe('A deck', function () {
  it('has many cards', function () {
    var deck = new Deck();
    expect(deck.cards.length).toBe(52);
  });

  it('can be shuffled, which changes the order of the cards', function () {
    var unshuffledDeck = new Deck();
    var shuffledDeck = new Deck();
    var isSameOrder = unshuffledDeck.cards.equals(shuffledDeck.cards);
    expect(isSameOrder).toBeFalsy();
  });

  it('can have cards drawn from it', function () {
    var deck = new Deck();
    var cards = deck.drawCards(12);
    var cardsIsArray = cards instanceof Array;
    expect(cardsIsArray).toBeTruthy();
    expect(deck.cards.length).toBe(40);
  });

  it('will complain if you draw more cards than it has', function () {
    var deck = new Deck();
    expect(function () { deck.drawCards(100); }).toThrow();
  });

  it('can be cut in half', function () {
    var deck = new Deck();
    deck.cut();
    expect(deck.cards.length).toBe(2);
    expect(deck.cards[0].cards).toBeDefined();
    expect(deck.cards[0].length).toBe(deck.cards[1].length);
  });

  it('can be cut at any point in the deck', function () {
    var deck = new Deck();
    deck.cut(23);
    expect(deck.cards[1].cards.length).toBe(29);
  });
});
