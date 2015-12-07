import AbstractClass from './AbstractClass.js';

class DeckAbstract extends AbstractClass {
  constructor (options) {
    super({
      methods: ['shuffle', 'drawCards', 'cut'],
      properties: ['cards']
    });
  }

  prePropertyCheck () {
    this._addCards.call(this);
  }
}

export default DeckAbstract;
