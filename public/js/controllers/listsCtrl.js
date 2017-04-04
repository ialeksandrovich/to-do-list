angular.module('app').controller('listsCtrl', function (listFactory) {
    
  this.lists = listFactory.getLists();

});
