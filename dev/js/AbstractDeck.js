import AbstractClass from './AbstractClass.js';

class AbstractDeck extends AbstractClass {
  constructor () {
    super({
      methods: ['shuffle', 'drawCards', 'cut']
    });
  }
}

export default AbstractDeck;
