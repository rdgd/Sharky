import AbstractClass from './AbstractClass.js';

class DeckAbstract extends AbstractClass {
  constructor (options) {
    super({
      methods: ['shuffle', 'drawCards', 'cut'],
      attributes: ['cards']
    });
  }

  preAttrCheck () {
    this._addCards.call(this);
  }
}

export default DeckAbstract;
