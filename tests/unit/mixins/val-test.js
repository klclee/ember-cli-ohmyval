import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';
import OhMyVal from 'ohmyval/mixins/ohmyval';

var App;
var TestObj = null;
module('presence', 'Tetsing presence', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('should able to check for presence', function() {
  TestObj = Ember.Object.extend(OhMyVal, {
      validations: {
        name: {presence: true}
      }
    });  

  var objInst = TestObj.create();
  var validationResults = objInst.validate();
  equal(false, objInst.get('valid'));
  objInst.set('name', 'charlie');
  validationResults = objInst.validate();
  equal(true, objInst.get('valid'));
});

test('should contain correct information in failed validation', function(){
  TestObj = Ember.Object.extend(OhMyVal, {
    validations: {
      name: {presence: true}
    }
  });  
  var objInst = TestObj.create();
  var validationResults = objInst.validate();
  equal(validationResults.length, 1);
  var result = validationResults[0];
  equal(result.failed, true);
  equal(result.message, 'This field cannot be blank');
  equal(result.field, 'name');
});

module('email', 'Tetsing presence', {
  setup: function() {
    App = startApp();    
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('should able to check for presence', function(){
  TestObj = Ember.Object.extend(OhMyVal, {
    validations: {
      email: {email: true}
    }
  });  
  var objInst = TestObj.create();
  var validationResults = objInst.validate();
  equal(objInst.get('valid'), false);
  
  objInst.set('email', 'charlie@email.com');
  
  validationResults = objInst.validate();
  equal(objInst.get('valid'), true);

});