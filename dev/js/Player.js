class Player {
  constructor (name) {
    this.name = name;
    this.card = null;
  }

  getCard () {
    return this.card;
  }

  setCard (card) {
    this.card = card;
    return this.card;
  }

  showCard () {
    return this.card.toPlainEnglish();
  }
}

export default Player;
