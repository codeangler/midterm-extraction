angular.module('extractionApp')
  .factory('ExtractionFactory', eFactory)

  function eFactory() {
    console.log("this is in the factory")
    commandingOfficer = {
      sudBefore : ['Report your current distress level', 'Check-in Soldier! How distressed are you presently'],
      sight : ['Environment Report! Name five things you see. Be sure to get a 360 deg perspective']
    }
    return commandingOfficer;
  }