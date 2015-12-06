var Player = require('../../js/Player.js');
var Card = require('../../js/Card.js');

describe('A player', function() {
  it('is instantiated with a name', function () {
    var player = new Player('Ryan');
    expect(player.name).toBe('Ryan');
  });

  it('doesn\'t have a card until you give it one', function () {
    var player = new Player('Ryan');
    var card = new Card('J', 'H');
    expect(player.card).toBeNull();

    var cardRetVal = player.setCard(card);
    expect(player.card).toBe(card);
    expect(cardRetVal).toBe(card);
  });

  it('can show its card value in plain English', function () {
    var player = new Player('Ryan');
    var card = new Card('J', 'H');
    player.setCard(card);
    expect(player.showCard()).toBe('Jack of Hearts');
  });
});
