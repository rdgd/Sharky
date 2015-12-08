import AbstractClass from './AbstractClass.js';

class DeckAbstract extends AbstractClass {
  constructor () {
    super({
      methods: ['shuffle', 'drawCards', 'cut'],
      attributes: ['cards']
    });
  }

  static preAttrCheck () {
    this._addCards.call(this);
  }
}

export default DeckAbstract;
