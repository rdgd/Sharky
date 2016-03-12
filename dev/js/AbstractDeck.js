import AbstractClass from '../../node_modules/abstract-class-harmony/dev/js/AbstractClass.js';

class AbstractDeck extends AbstractClass {
  constructor () {
    super({
      methods: ['shuffle', 'drawCards', 'cut']
    });
  }
}

export default AbstractDeck;
