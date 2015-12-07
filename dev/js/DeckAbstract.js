import AbstractClass from './AbstractClass.js';

class DeckAbstract extends AbstractClass {
  constructor () {
    super({
      name: 'DeckAbstract',
      methods: ['shuffle', 'drawCards', 'cut'],
      properties: ['cards']
    });
  }
}

export default DeckAbstract;
