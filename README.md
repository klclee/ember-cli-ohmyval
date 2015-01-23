## ember-cli-ohmyval

A small validation mixin script I am using that work (even with Ember Data).

## Motivation


There is a few validation packages around but non of them works well with Ember Data. Mainly because it is using 'isValid' which Ember data uses. So I made this for the few Ember projects I am working on.

## Installation

```npm install ember-cli-ohmyval --save-dev```

Then import where you need it.

```import VlidationMixin from 'ohmyval/mixins/ohmyval'```


## Validations

### Presence:

```javascript
    submitFunction: function(){
      var userObj = Ember.Object.extend({
        validations:{
          name: {presence: true}
        }
      });

      var objInst = userObj.create();
      var validationResult = objInst.validate();
      objInst.get('valid'); //false
      validationResult // array of {failed: true, message: 'This field cannot be blank', field: 'name'}
    }
}
```

### Email:

```javascript

  submitFunction: function(){
      var userObj = Ember.Object.extend({
        validations:{
          email: {email: true}
        }
      });

      var objInst = userObj.create({email: 'someWrongFormat'});
      var validationResult = objInst.validate();
      objInst.get('valid'); //false
      validationResult // array of {failed: true, message: 'This is not a valid email', field: 'email'}
    }

```

### Numericality

```javascript

  submitFunction: function(){
      var userObj = Ember.Object.extend({
        validations:{
          phoneNumber: {numericality: true}
        }
      });

      var objInst = userObj.create({phoneNumber: 'abc'});
      var validationResult = objInst.validate();
      objInst.get('valid'); //false
      validationResult // array of {failed: true, message: 'This only allow numbers', field: 'phoneNumber'}
    }
```
### Numericality (greater than)

```javascript

  submitFunction: function(){
    var basketObj = Ember.Object.extend({
      validations:{
        discount: {numericality: {
          greaterThan: 100
        }}
      }
    });

    var objInst = basketObj.create({discount: 101});
    var validationResult = objInst.validate();
    objInst.get('valid'); //false
    validationResult // array of {failed: true, message: 'Cannot be larger then 100', field: 'discount'}
  }

```

### Numericality (less than)

```javascript

  submitFunction: function(){
    var basketObj = Ember.Object.extend({
      validations:{
        discount: {numericality: {
          lessThan: 50
        }}
      }
    });

    var objInst = basketObj.create({discount: 49});
    var validationResult = objInst.validate();
    objInst.get('valid'); //false
    validationResult // array of {failed: true, message: 'Cannot be less then 50', field: 'discount'}
  }

```

### Numericality (range)

```javascript

  submitFunction: function(){
    var basketObj = Ember.Object.extend({
      validations:{
        discount: {numericality: {
          greaterThan: 100
          lessThan: 50
        }}
      }
    });

    var objInst = basketObj.create({discount: 49});
    var validationResult = objInst.validate();
    objInst.get('valid'); //false
    validationResult // array of {failed: true, message: 'Cannot be less then 50', field: 'discount'}
    objInst.set('discount', 101);
    validationResult = objInst.validate();
    objInst.get('valid'); //false
    validationResult // array of {failed: true, message: 'Cannot be greater then 100', field: 'discount'}
  }

```

### Inclusion (simple list)

```javascript
  var simpleList = ['UK', 'US', 'HK'];
  submitFunction: function(){
    var userObj = Ember.Object.extend({
      validations:{
        country: {
          inclusion: {
            list: simpleList
          }
        }
      }
    });

    var objInst = userObj.create({country: 'NZ'});
    var validationResult = objInst.validate();
    objInst.get('valid'); //false
    validationResult // array of {failed: true, message: 'is not included in the list', field: 'country'}
  }

```

### Inclusion (complex list)



```javascript
  var complexList = Em.A();
  complexList.push({show: 'UK', code: 123});
  complexList.push({show: 'US', code: 234});
  complexList.push({show: 'HK', code: 456});
  submitFunction: function(){
    var userObj = Ember.Object.extend({
      validations:{
        country: {
          inclusion: {
            list: complexList,
            property: 'show' //add the property you want to match against.
          }
        }
      }
    });

    var objInst = userObj.create({country: 'NZ'});
    var validationResult = objInst.validate();
    objInst.get('valid'); //false
    validationResult // array of {failed: true, message: 'is not included in the list', field: 'email'}
  }

```

### Custom Error Message

```javascript

  var userObj = Ember.Object.extend({
    validations:{
      name: {presence: true, message: 'I pitty the foo whom left out the name!'}
    }
  });

```

## Next Steps

* More tests.
* Add more validation
* Make it easily extendable with custom validation