import Card from '../../js/Card.js';

describe('A card', function () {
  it('Has a face value and suit', function () {
    var card = new Card(2, 'C');
    expect(card.faceValue).toBe(2);
    expect(card.suit).toBe('C');
  });

  it('can derive value from a letter representation of a face card', function () {
    var card = new Card('A', 'S');
    expect(card._setValue('A')).toBe(14);
  });

  it('can describe itself in plain English', function () {
    var card = new Card(2, 'C');
    expect(card.toPlainEnglish()).toBe('2 of Clubs');
  });

  // Only matters if a face card
  it('can get its value name spelled out', function () {
    var card = new Card('K', 'D');
    expect(card.getCardValueName()).toBe('King');
  });

  it('can get its suit name spelled out', function () {
    var card = new Card('K', 'D');
    expect(card.getSuitName()).toBe('Diamonds');
  });
});
