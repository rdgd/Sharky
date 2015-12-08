class AbstractClass {
  constructor (contract) {
    // An abstract class does us no good if it is empty. Must have contract.
    if (!contract) { return false; }

    //  We must always have the following three pieces.
    var implementation = this.__proto__;
    var definition = implementation.__proto__;
    var enforcer = definition.__proto__;

    /*
      To minimize abstract class definition footprint,
      we set these attributes for the developer.
    */
    definition.methods = !contract.methods ? [] : contract.methods;
    definition.attributes = !contract.attributes ? [] : contract.attributes;

    // Using the name of this class elsewhere is confusing
    if (this.constructor.name === enforcer.constructor.name) {
      throw 'You may not name your class "' + this.constructor.name + '"';
    }

    /*
      The abstract class definition and this class cannot be instatiated directly
      or in other words, the developer must use an appropriately named implementation
    */
    if (this.constructor === AbstractClass ||
        this.constructor === definition.constructor) {
      throw 'You may not instantiate an abstract class directly.';
    }

    /*
      If any setup needs to be done before an integrity check, you may do so
      by implementing the static methods preMethodCheck and preAttrCheck in your
      class definition
    */
    if (definition.constructor.preMethodCheck) {
      definition.constructor.preMethodCheck.call(this.__proto__);
    }
    this.checkMethods();

    if (definition.constructor.preAttrCheck) {
      definition.constructor.preAttrCheck.call(this.__proto__);
    }
    this.checkAttrs();
  }

  /*
    Iterating over the abstract class definition's required methods, and checking
    the implementation for them.
  */
  checkMethods () {
    var implemented = true;
    for (var method of this.__proto__.methods) {
      implemented = this[method];
      if (!implemented) {
        throw 'You must implement the method "' +
          method + '" specified by the abstract class';
      }
    }
  }

  /*
    Abstract properties are not common, but I figured I would create the option
    for them, should somebody find it useful. Kind of like C# without enforcing
    a getter function.
  */
  checkAttrs () {
    var implemented = true;
    for (var property of this.__proto__.attributes) {
      implemented = this.__proto__.hasOwnProperty(property);
      if (!implemented) {
        throw 'You must implement the property "' +
              property + '" specified by the abstract class';
      }
    }
  }
}

export default AbstractClass;
