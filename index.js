module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'test-skill' );
var rp = require('request-promise');
var servRP = 'https://rfo.im/report.php';

app.launch( function( request, response ) {
  response
	.say('Hi, what do you want?' ).
  reprompt( 'Are you ok?' ).
  shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
  console.log(exception)
  response.say( 'Sorry an error occured ' + error.message);
};

app.intent('GetNewIntent',
  {
    "slots":{
      "variable":"string"
    }
  },
  function(request, response) {
    var variable = request.slot('variable');
		rp({
			method: 'GET',
			uri: servRP,
			resolveWithFullResponse: true
		}).then(function(res) {
			response
			.say("You asked for " + variable + ". The random number is " + res.body)
			.shouldEndSession(true)
			.send();
		}).catch(function(err) {
			response
			.say("I didn't have data for " + variable)
			.shouldEndSession(true)
			.send();
		});
		return false;
	}
);

module.exports = app;
