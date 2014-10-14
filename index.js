var path = require('path');
var fs   = require('fs');
module.exports = {
  name: 'ember-cli-ohmyval',
  init: function(project){
  },
  unwatchedTree: function(dir) {
    return {
      read:    function() { return dir; },
      cleanup: function() { }
    };
  },
  treeFor: function(name) {
    if(name === "app"){
      var treePath =  path.join('node_modules','ember-cli-ohmyval',name);
      if (fs.existsSync(treePath)) {
        console.log('AAA');
        return this.unwatchedTree(treePath);
      } 
    }
  }
};
