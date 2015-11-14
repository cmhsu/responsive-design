var app = angular.module('app', []);

app.controller('appCtrl', function($scope) {
  $scope.showNavButton = true;
  $scope.showWelcome = true;
  $scope.showForm = false;
  $scope.newBookTitle = '';
  $scope.newBookAuthor = '';
  $scope.newBookImage = '';
  $scope.duplicateDetected = false;
  $scope.missingField = false;
  //initial books.
  $scope.books = [
    {
      title: 'El Pooch',
      author: 'Alex Nelson',
      image: 'images/elPooch.png'
    },
    {
      title: 'The Flight',
      author: 'Scott Masterson',
      image: 'images/theFlight.png'
    }
  ];
  //index used to split books into left and right columns.
  $scope.splitBooksIndex = Math.floor($scope.books.length / 2) + 1;
  //when YES is clicked, book form is shown.
  $scope.newBook = function() {
    $scope.showForm = true;
  };
  //when NO is clicked, 'Welcome' box and book form are hidden.
  $scope.noNewBook = function() {
    $scope.showWelcome = false;
    $scope.showForm = false;
  };
  //for mobile nav, toggle nav view.
  $scope.showNav = function() {
    $scope.showNavButton = !$scope.showNavButton;
    $('.grey-screen').css({'width':$(document).width(),'height':$(document).height()})
  };
  //submit book form.
  $scope.submitForm = function() {
    var currentBook;
    $scope.duplicateDetected = false;
    $scope.missingField = false;
    var newBookTitle = $scope.newBookTitle.length >= 1 ? $scope.newBookTitle[0].toUpperCase() + $scope.newBookTitle.slice(1) : $scope.newBookTitle;
    var newBookAuthor = $scope.newBookAuthor;
    var newBookImage = $scope.newBookImage;
    if (newBookTitle === '' || newBookAuthor === '') {
      $scope.missingField = true;
      return;
    }
    var newBook = {
      title: newBookTitle,
      author: newBookAuthor,
      image: newBookImage
    };
    //detect duplicates in books array.
    for (var i = 0; i < $scope.books.length; i++) {
      currentBook = $scope.books[i];
      if (currentBook.title === newBookTitle && currentBook.author === newBookAuthor) {
        $scope.duplicateDetected = true;
      }
    }
    // if no duplicate, add the new book to the books array.
    if ($scope.duplicateDetected === false) {
      $scope.books.push(newBook);
      $scope.splitBooksIndex = Math.floor($scope.books.length / 2) + 1;
      $scope.books = $scope.books.sort(function(a,b) {
        if (a.title < b.title) {
          return -1
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }
    $scope.newBookTitle = '';
    $scope.newBookAuthor = '';
    $scope.newBookImage = '';
  };
});