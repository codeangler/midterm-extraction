angular.module('extractionApp', ['ui.router'])
  .config(configRouter)
  .controller('homeCtrl', homeController)
  .controller('panicCtrl', panicController)

  configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  panicController.$inject = ['ExtractionFactory'];

  // Establish partials of .states and .states.sub
  function configRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl as hCtrl',
      })
      .state ('panicGame',{
        url: '/panic-game',
        templateUrl: 'partials/panic-game.html',
        controller: 'panicCtrl as pCtrl'
      })
      .state('panicGame.rating',{
        templateUrl: 'partials/panic-rating.html'
      })
      .state('panicGame.intervention', {
        templateUrl: 'partials/panic-intervention.html'
      })

    $urlRouterProvider.otherwise('/')
  }
  
  // function that runs the "I-AWARE INTERVENTION GAME" Panic Control
  function panicController(ExtractionFactory) {
    var pCtrl = this;
    pCtrl.gameRecord = [];
    pCtrl.response = "";
    // Function to gather the value of the the SUD Rating + Timestamp at that moment
    pCtrl.submitRating = function(event) {
      var rating = Number(event.target.id);
      var timeStamp = event.timeStamp;

      // .push(rating &  timeStamp) to gameRecord Array
      pCtrl.gameRecord.push({sud: rating, timeStamp: timeStamp})
      // console.log(pCtrl.gameRecord);
    }

    pCtrl.submitReponse = function(){
      console.log('I hope this is the response from submission in a text input ' + pCtrl.response)
    }
    // Access object with multiple arrays that are the text the Commanding Officer statements
    pCtrl.officerCommand = commandingOfficer.sudBefore[1]

    //console.log("this is returned from eFactory " + ExtractionFactory)
    // pCtrl.greeting = "panic controller greeting"
  
  }

//  homeCtrl as hCtrl
  function homeController() {
    var hCtrl = this;
    hCtrl.greeting = 'home controller greeting'
    console.log('hello from ' + hCtrl.greeting);
  }