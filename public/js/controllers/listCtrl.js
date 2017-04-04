angular.module('app').controller('listCtrl', function (listFactory, cardFactory) {

    this.showAddCard = false;

    this.getCards = function (list, cards) {
        return cardFactory.getCards(list);
    };

    this.createCard = function (list) {
        cardFactory.createCard(list, this.cardTitle, this.cardDescription);
        this.cardTitle = '';
        this.cardDescription = '';
    };
});
