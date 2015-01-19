import Em from 'ember';
export default Em.Mixin.create({
  rules: {
    presence: function(property, arg, scope){
      if(arg.presence === true){
        var val = scope.get(property);
        var condition = Em.isBlank(val);
        var message = 'This field cannot be blank';
        if(arg.message){
          message = arg.message;
        }
        return {failed: condition, message: message, field: property};
      }else{
        return {failed: false};
      }
    },
    email: function(property,arg, scope){
      if(arg.email === true){
        var presenceResult = scope.get('rules').presence(property,arg, scope);
        if(presenceResult.failed){
          return presenceResult;
        }else{
          var regex = new RegExp(/.+@.+\..{2,4}/);
          var condition = !regex.test(scope.get(property));
          var message = 'This is not a valid email';
          if(arg.message){
            message = arg.message;
          }
          return {failed: condition, message: message, field: property};
        }
      }else{
        return {failed: false};
      }


    },
    numericality: function(property, arg, scope){
      if(arg.numericality === true || typeof arg.numericality === 'object'){
        var message = 'This only allow numbers';
        if(arg.message){
          message = arg.message;
        }

        var value = scope.get(property);
        if(Em.isBlank(value)){
          return {failed: true, message: message, field: property};
        }else{
          var regex = new RegExp(/^[0-9]+(?:\.\d*[0-9])?$/);
          var condition = !regex.test(value);
          if(condition){
            return {failed: condition, message: message, field: property};
          }else{
            var greaterThanValue = arg.numericality.greaterThan;
            var lessThanValue = arg.numericality.lessThan;
            if(!Em.isBlank(greaterThanValue)){
              message = "Cannot be larger then " + greaterThanValue;
              condition = parseFloat(value) > greaterThanValue;
            }

            if(!Em.isBlank(lessThanValue) && !condition){
              message = "Cannot be less then " + lessThanValue;
              condition = parseFloat(value) < lessThanValue;
            }

            return {failed: condition, message: message, field: property};
          }
        }
      }else{
        return {failed: false};
      }


    },
    inclusion: function(property, arg, scope){

      if(Em.isBlank(scope.get(property))){
        return {failed: true, message: 'This field cannot be blank', field: property};
      }else{
        var val = scope.get(property);
        var list = arg.inclusion.list;
        var findProperty = arg.inclusion.property;
        var condition = false;
        if(Em.isBlank(findProperty)){
          condition = list.indexOf(val) === -1;
          return {failed: condition, message: 'is not included in the list', field: property};
        }else{
          condition = Em.isBlank(list.findBy(findProperty, val));
          return {failed: condition, message: 'is not included in the list', field: property};
        }

      }
    }
  },
  valid: true,
  validate: function(){
    var validations = this.get('validations');
    Em.assert('No Validation specifed', validations);
    var validationFields = Em.keys(validations);

    var failedValidations = [];
    var _scope = this;
    var func = null;
    validationFields.forEach(function(key){
      var funcString = Em.keys(validations[key])[0];
      func = _scope.get('rules')[funcString];
      var result = func(key,  validations[key], _scope);
      if(result.failed){
        failedValidations.push(result);
      }

    });

    this.set('valid', failedValidations.length === 0);
    return failedValidations;
  }
});