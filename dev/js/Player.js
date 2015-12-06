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
