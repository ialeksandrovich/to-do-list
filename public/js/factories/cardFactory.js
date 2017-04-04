angular.module('app').factory('cardFactory', function ($http) {

    var service = {};
    var cards = [];

    $http.get('/todos')
        .success(function(data) {
            cards = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    service.getCards = function (list) {
        return cards.filter(card => card.list_id === +list.id);
    }

    service.createCard = function (list, cardTitle, cardDescription) {
        var data = {
                "title": cardTitle,
                "description": cardDescription,
                "list_id": list.id
            };
        $http.post('/todos', data)
            .success(function(data) {
                cards = data;
            })
            .error(function(data) {
                 console.log('Error: ' + data);
            });
    };

    service.deleteCard = function (card) {
        $http.delete('/todos/' + card._id)
            .success(function(data) {
                cards = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    service.updateCard = function (updatingCard) {
        $http.put('/todos/' + updatingCard._id, updatingCard)
            .success(function(data) {
                cards = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    return service;
});
