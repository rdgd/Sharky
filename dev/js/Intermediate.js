import DeckAbstract from './DeckAbstract.js';

class Intermediate extends Foo {
  constructor () {
    super();
  }
}

export class Foo extends DeckAbstract {
  constructor () {
    super();
    console.log('pee');
  }
}

export default Intermediate;
