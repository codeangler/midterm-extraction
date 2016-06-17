angular.module('extractionApp')
  .factory('ExtractionFactory', eFactory)

  function eFactory() {
    
    commandingOfficer = {
      sud : ['Report your current distress level', 'Check-in Soldier! How distressed are you presently'],
      mission : ['MISSION COMPLETE! Nice work soldier.'],
      encouragement : ['Keep going', 'Nice work.', 'Take your time. Not too fast. Not too slow.'],
      sight : ['Environment Report! List five things you see around you.'],
      touch : ['Touch four surfaces and report to me their texture'],
      sound : ['Listen! Report three sounds you hear'],
      smell : ['Describe two smells you are near you'],
      taste : ['Finally, report one thing you can taste presently'],
      initialHome : ['Soldier: Recover your hijacked mind by completing these missions!']
    }

    currentRank = ['private', 'Private First Class', 'Lance Corporal']
    factoryGameRecord = {};
    factoryIterator = 0

    return {
      co : commandingOfficer,
      gameRecord : factoryGameRecord,
      iterator : factoryIterator,
      rank : currentRank,
    };
  }