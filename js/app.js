angular.module('extractionApp', ['ui.router'])
  .config(configRouter)
  //.controller('homeCtrl', homeController)
  .controller('panicCtrl', panicController)
  
  configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  panicController.$inject = ['ExtractionFactory', '$scope', '$state'];

  // Establish partials of .states and .states.sub
  function configRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'panicCtrl as pCtrl',
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
     // var i = 0; // myCount() works to update iterations throughout controller
    pCtrl.responseCounter = [5,4,3,2,1]
    pCtrl.gameRecord = [];
    pCtrl.response = "";
    pCtrl.passFactoryGameRecord = factoryGameRecord;
    ratingChangeFunc = function(factoryGameRecord){
      pCtrl.ratingChange = (Number(factoryGameRecord.gameRecord.sud1) - Number(factoryGameRecord.gameRecord.sud17))
    }

    pCtrl.currentRank = currentRank[0]

    // pCtrl.timeElasped = timeFunction

    // var timeFunction = function (beginning, ending) {
    //   return (ending - beginning)*1000
    // }


     


    // SUD Rating + currentDate at that moment of selection
    pCtrl.submitRating = function(event) {
      var rating = Number(event.target.id);
      var currentDate = new Date();
      var stringDate = currentDate.toString();
      // .push(rating &  currentDate) to gameRecord Array
      // alternative syntax that needs spefic iteration pCtrl.gameRecord.push({sud: rating, currentDate: currentDate})
      pCtrl.gameRecord["sud" + factoryIterator] = rating;
      pCtrl.gameRecord["currentDate" + factoryIterator] = currentDate;
      pCtrl.gameRecord["stringDate" + factoryIterator] = stringDate; 
      myCount();
      pCtrl.stepThroughIterator(factoryIterator);
      factoryGameRecord.gameRecord = pCtrl.gameRecord
      console.log(factoryIterator)
      console.log(factoryGameRecord.gameRecord.stringDate1)
    }

    pCtrl.submitResponse = function(e){
      var currentDate = new Date();
      var stringDate = currentDate.toString();
      pCtrl.gameRecord["response" + factoryIterator] = pCtrl.response;
      pCtrl.gameRecord["currentDate" + factoryIterator] = currentDate;
      pCtrl.gameRecord["stringDate" + factoryIterator] = stringDate; 
      pCtrl.response = "";
      
      // mobile testing alert
      // alert('response from submission in a text input ' + pCtrl.gameRecord["response" + i])
      myCount();
      pCtrl.stepThroughIterator(factoryIterator);
      factoryGameRecord.gameRecord = pCtrl.gameRecord
      factoryIterator = factoryIterator;
         
      // Swap ui-sref="game-report" w/n panicGame.rating 
      ratingSrefSwap()
      ratingAgainState(factoryIterator);
    }

    // Access Commanding Officer statements stored as arrays within object found in app.extraction-factory.js
    pCtrl.stepThroughIterator = function (factoryIterator){
      console.log("stepThroughIterator", factoryIterator)
      if ( factoryIterator == 0 ) {
        myCount();
        pCtrl.officerStatements = commandingOfficer.initialHome[0]
        typewriter();
      }
      else if ( factoryIterator == 1 ) {
        pCtrl.officerStatements = commandingOfficer.sud[1]
        clearInterval(typewriterTimer);
        typewriter();
      }
      else if ( factoryIterator == 2 ) {
        // sight
        pCtrl.currentSense = "Sights";
        pCtrl.officerStatements = commandingOfficer.sight[0];
        // clearInterval(typewriterTimer);
        // typewriter();  
      }
      else if ( factoryIterator == 7 ){
        // touch
        pCtrl.currentSense = "Textures";
        pCtrl.officerStatements = commandingOfficer.touch[0]
        // clearInterval(typewriterTimer);
        // typewriter();
      }
      else if ( factoryIterator == 11 ){
        // sound
        pCtrl.currentSense = "Sounds";
        pCtrl.officerStatements = commandingOfficer.sound[0]
        // clearInterval(typewriterTimer);
        // typewriter();
      }
      else if ( factoryIterator == 14 ) {
        // smell
        pCtrl.currentSense = "Smells";
        pCtrl.officerStatements = commandingOfficer.smell[0]
        // clearInterval(typewriterTimer);
        // typewriter();
      } 
      else if ( factoryIterator == 16 ){
        // taste
        pCtrl.currentSense = "Taste";
        pCtrl.officerStatements = commandingOfficer.taste[0]
        // clearInterval(typewriterTimer);
        // typewriter();
      }
      else if ( factoryIterator == 17 ){
        // Announce Mission Complete Get Another Sud Reading 
        pCtrl.officerStatements = commandingOfficer.sud[0]
        // clearInterval(typewriterTimer);
        // typewriter();
      } 
      else if ( factoryIterator == 18 ){
        // Announce Mission Complete Get Another Sud Reading 
        pCtrl.officerStatements = commandingOfficer.mission[0]
        clearInterval(typewriterTimer);
        typewriter();

        // console.log(timeFunction)
        // pCtrl.timeElasped(factoryGameRecord.gameRecord.currentDate0)
        
        ratingChangeFunc(factoryGameRecord);
      } 
    } 
    // initial call of pCtrl.stepThroughIterator(i=0)
    pCtrl.stepThroughIterator(factoryIterator);

    // establish function myCount() to interate throughout the controller
    function myCount(){ factoryIterator++; }

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

    ratingAgainState = function (i) {
      // After completing all steps of intervention return to SUD rating 
      if ( factoryIterator == 17) {
        $state.go("panicGame.rating")
      }
    }

  }

//  homeCtrl as hCtrl
  function homeController() {
    var hCtrl = this;
  }