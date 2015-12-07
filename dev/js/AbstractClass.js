class AbstractClass {
  constructor (contract) {
    if (!contract) { return false; }

    var implementation = this.__proto__;
    var definition = implementation.__proto__;
    var enforcer = definition.__proto__;

    definition.methods = !contract.methods ? [] : contract.methods;
    definition.properties = !contract.properties ? [] : contract.properties;

    if (this.constructor.name === enforcer.constructor.name) {
      throw 'You may not name your class "' + this.constructor.name + '"';
    }

    if (this.constructor === AbstractClass ||
        this.constructor === definition.constructor) {
      throw 'You may not instantiate an abstract class directly.';
    }

    if (definition.preMethodCheck) {
      definition.preMethodCheck.call(this.__proto__);
    }
    this.checkMethods();

    if (definition.prePropertyCheck) {
      definition.prePropertyCheck.call(this.__proto__);
    }
    this.checkProperties();
  }

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

  checkProperties () {
    var implemented = true;
    for (var property of this.__proto__.properties) {
      implemented = this.__proto__.hasOwnProperty(property);
      if (!implemented) {
        throw 'You must implement the property "' +
              property + '" specified by the abstract class';
      }
    }
  }
}

export default AbstractClass;
