angular.module('app').factory('listFactory', function () {
    var service = {};

    var lists = [{
            id: 1,
            listName: 'To do'
        },{
            id: 2,
            listName: 'In Progress'
        },{
            id: 3,
            listName: 'Done'
        }];

    service.getLists = function () {
        return lists;
    };

    return service;
});
