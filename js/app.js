angular.module('extractionApp', ['ui.router'])
  .config(configRouter)
  .controller('homeCtrl', homeController)
  .controller('panicCtrl', panicController)

  configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  panicController.$inject = ['ExtractionFactory', '$scope', '$state'];

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
      .state('panicRecord',{
        url: '/panic-record',
        templateUrl: 'partials/panic-record.html',
        controller: 'panicCtrl as pCtrl'
      })

    $urlRouterProvider.otherwise('/')
  }
  
  // function that runs the "I-AWARE INTERVENTION GAME" Panic Control
  function panicController(ExtractionFactory, $scope, $state) {
    var pCtrl = this;
    var i = 0; // myCount() works to update iterations throughout controller
    pCtrl.responseCounter = [5,4,3,2,1]
    pCtrl.gameRecord = [];
    pCtrl.response = "";
    pCtrl.greeting = "this is something "
    // SUD Rating + Timestamp at that moment of selection
    pCtrl.submitRating = function(event) {
      var rating = Number(event.target.id);
      var timeStamp = event.timeStamp;

      // .push(rating &  timeStamp) to gameRecord Array
      // alternative syntax that needs spefic iteration pCtrl.gameRecord.push({sud: rating, timeStamp: timeStamp})
      pCtrl.gameRecord["sud" + i] = rating;
      pCtrl.gameRecord["timeStamp" + i] = timeStamp;
      myCount();
      pCtrl.officerCommands(i);
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
      
      // After completing all steps of intervention return to SUD rating 
      if ( i == 16) {
        $state.go("panicGame.rating")
      }
      // Swap ui-sref="game-report" w/n panicGame.rating 
      ratingSrefSwap()
    }

    // Access Commanding Officer statements stored as arrays within object found in app.extraction-factory.js
    pCtrl.officerCommands = function (i) {
      if ( i == 0 ) {
        pCtrl.officerStatements = commandingOfficer.sud[1]
        typewriter();
      }
      else if ( i == 1 ) {
        // sight
        pCtrl.currentSense = "Sights";
        pCtrl.officerStatements = commandingOfficer.sight[0];
        clearInterval(typewriterTimer);
        typewriter();
        // Establish Count Down for Sight
        
      }
      else if ( i == 6 ){
        // touch
        pCtrl.currentSense = "Textures";
        pCtrl.officerStatements = commandingOfficer.touch[0]
        clearInterval(typewriterTimer);
        typewriter();
      }
      else if ( i == 10 ){
        // sound
        pCtrl.currentSense = "Sounds";
        pCtrl.officerStatements = commandingOfficer.sound[0]
        clearInterval(typewriterTimer);
        typewriter();
      }
      else if ( i == 13 ) {
        // smell
        pCtrl.currentSense = "Smells";
        pCtrl.officerStatements = commandingOfficer.smell[0]
        clearInterval(typewriterTimer);
        typewriter();
      } 
      else if ( i == 15 ){
        // taste
        pCtrl.currentSense = "Taste";
        pCtrl.officerStatements = commandingOfficer.taste[0]
        clearInterval(typewriterTimer);
        typewriter();
      }
      else if ( i == 16 ){
        // Announce Mission Complete Get Another Sud Reading 
        pCtrl.officerStatements = commandingOfficer.sud[0]
        clearInterval(typewriterTimer);
        typewriter();
      }   
      
      // pCtrl.officerTypewriter = pCtrl.officerStatements;
    } 
    pCtrl.officerCommands(i);

    // establish function myCount() to interate throughout the controller
    function myCount(){ i++; }

    // Typewriter effect using setInterval() to effect {{bound.text}}  | clearInterval()
    function typewriter() {
      var localContent = pCtrl.officerStatements;
      pCtrl.officerTypewriter = "";

      var k = 0;
     
      typewriterTimer = setInterval(function(){
          if (k < localContent.length){
          pCtrl.officerTypewriter += localContent[k]
          k++;
          $scope.$apply();
          }
        }, 100);
    }

    // Set ui-sref w/n panic-rating.html dependent on value of i 
    
    pCtrl.ratingSref = "panicGame.intervention";
    function ratingSrefSwap() {
      pCtrl.ratingSref = 'panicRecord';
    }
  }

//  homeCtrl as hCtrl
  function homeController() {
    var hCtrl = this;
    hCtrl.greeting = 'home controller greeting'
    console.log('hello from ' + hCtrl.greeting);
  }