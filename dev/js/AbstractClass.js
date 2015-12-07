class AbstractClass {
  constructor (options) {
    if (this.__proto__.methodsImplemented) {
      
      return false;
    }

    if (!options) { return false; }
    if (!options.name) { throw 'You must provide a name for your abstract class'; }

    /*
       The context here is the implementing class. And we want these properties
       to be of the abstract class it is implementing
    */
    this.__proto__.name = options.name;
    this.__proto__.methods = !options.methods ? [] : options.methods;
    this.__proto__.properties = !options.properties ? [] : options.properties;

    if (this.constructor === AbstractClass ||
        this.constructor.name === this.__proto__.name) {
      throw 'You may not instantiate an abstract class directly.';
    }

    this.methodsAreImplemented();

    // this.constructor = function (callback) {
    //   return function () {
    //     console.log('calling the constructor again');
    //     this.constructor();
    //     this.propertiesAreImplemented();
    //     return false;
    //   }.bind(this);
    // }.call(this)();
    // return false;
  }

  methodsAreImplemented () {
    console.log('checking methods');
    var implemented = true;
    for (var method of this.__proto__.methods) {
      implemented = this[method];
      if (!implemented) {
        throw 'You must implement the method "' +
              method + '" specified by the abstract class';
      }
    }
    this.__proto__.methodsImplemented = implemented;
  }

  propertiesAreImplemented () {
    console.log('checking props');
    var implemented = true;
    for (var property of this.__proto__.properties) {
      implemented = this.hasOwnProperty(property);
      if (!implemented) {
        throw 'You must implement the property "' +
              property + '" specified by the abstract class';
      }
    }

    this.__proto__.propertiesImplemented = implemented;
  }
}

export default AbstractClass;
