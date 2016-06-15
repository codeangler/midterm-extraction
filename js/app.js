angular.module('extractionApp', ['ui.router'])
  .config(configRouter)
  .controller('homeCtrl', homeController)
  .controller('panicCtrl', panicController)

  configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  panicController.$inject = ['ExtractionFactory', '$scope'];

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
  function panicController(ExtractionFactory, $scope) {
    var pCtrl = this;
    var i = 0; // myCount() works to update iterations throughout controller
    

    pCtrl.gameRecord = [];
    pCtrl.response = "";

    // Function to gather the value of the the SUD Rating + Timestamp at that moment
    pCtrl.submitRating = function(event) {
      var rating = Number(event.target.id);
      var timeStamp = event.timeStamp;

      // .push(rating &  timeStamp) to gameRecord Array
      // pCtrl.gameRecord.push({sud: rating, timeStamp: timeStamp})
      pCtrl.gameRecord["sud" + i] = rating;
      pCtrl.gameRecord["timeStamp" + i] = timeStamp;
      myCount();
      pCtrl.officerCommands(i);
      // console.log(pCtrl.gameRecord);
    }

    pCtrl.submitResponse = function(e){
      var timeStamp = e.timeStamp;
      pCtrl.gameRecord["response" + i] = pCtrl.response;
      pCtrl.gameRecord["timeStamp" + i] = timeStamp;
      pCtrl.response = "";
      console.log(pCtrl.gameRecord);
      // mobile testing alert
      // alert('response from submission in a text input ' + pCtrl.gameRecord["response" + i])
      myCount();
      pCtrl.officerCommands(i);
    }

    // Access object with multiple arrays that are the text the Commanding Officer statements
 
    pCtrl.officerCommands = function (i) {
      pCtrl.officerTypewriter = "";
      if ( i == 0 ) {
        pCtrl.officerStatements = commandingOfficer.sud[1]
      }
      else if ( i <= 5 ) {
        // sight
        pCtrl.officerStatements = commandingOfficer.sight[0]
      }
      else if ( i <= 9 ){
        // touch
        pCtrl.officerStatements = commandingOfficer.touch[0]
      }
      else if ( i <= 12 ){
        // sound
        pCtrl.officerStatements = commandingOfficer.sound[0]
      }
      else if ( i <= 14 ) {
        // smell
        pCtrl.officerStatements = commandingOfficer.smell[0]
      } 
      else if ( i <= 15 ){
        // taste
        pCtrl.officerStatements = commandingOfficer.taste[0]
      }
      else if ( i <= 16 ){
        // Announce Mission Complete Get Another Sud Reading 
        pCtrl.officerStatements = commandingOfficer.sud[0]
      }   
      pCtrl.officerTypewriter = pCtrl.officerStatements;
      
      // var k = 0;
      // var timer = setInterval(function(){
      // if ( k < pCtrl.officerStatements.length){
      //   pCtrl.officerTypewriter += pCtrl.officerStatements[k]
      //   k++;
      //   $scope.$apply();
      //   }
      // }, 100);
    }
 
    pCtrl.officerCommands(i);
    // establish function myCount() to interate throughout the controller
    function myCount(){
        i++;
      }
    //console.log("this is returned from eFactory " + ExtractionFactory)
    // pCtrl.greeting = "panic controller greeting"
  }

//  homeCtrl as hCtrl
  function homeController() {
    var hCtrl = this;
    hCtrl.greeting = 'home controller greeting'
    console.log('hello from ' + hCtrl.greeting);
  }