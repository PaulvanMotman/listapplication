// Requiring postgres
var pg = require('pg');
// Store the connectionstring in a simple variable
var connectionString = "postgres://Paul:postgres@localhost/bulletinboard";

// export function to communicate with postgres
module.exports = function (queryString, queryParameters, onComplete) {
	// normalize parameters: if queryParameters doesn;t get used, the function only takes in two parameters, the 
	// second being the callback
	if (typeof queryParameters == 'function') { 
		onComplete = queryParameters;
		queryParameters = [];
	}
	// connect with the database bulletinboard
	pg.connect(connectionString, function (err, client, done) {
		// check for errors
		if (err) {
			console.log('error: connection to database failed. connection string: \"' + connectionString + '\" ' + err);
			// disconnect the client
			if (client) {
				done(client);
			}

			if (onComplete !== undefined) {
				onComplete(err);
			}

			return;
		}
		// fill out a query to postgres, inserting whatever queryString and queryParameters you've put in
		client.query(queryString, queryParameters, function (err, result) {
				// check for errors
				if (err) {
					done(client);
					console.log('error: query failed: \"' + queryString + '\", \"' + queryParameters + "\" " + err);
				} else {
					done();
				}
				// call the callback
				if (onComplete !== undefined) {
					onComplete(err, result);
				}
			}
		);
	});
};