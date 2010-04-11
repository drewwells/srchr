var yahooEngine = Object.create(engineInterface);

yahooEngine.search = function(term){
	var that = this, text = term || 'SFO';
	var queryCallback = function(data){
		if (!!data.error) {
			if (data.error.description) {
				alert("YQL Error: " + data.error.description);
			}
		}
		else {
			query = data.query; //populate the query object with results.result[] and other elements stored in data.query
			that.resultCache[term] = query; //put query object into cache
			that.displayResults(query);
		}
	}
	if( !that.hasOwnProperty('resultCache') ) that.resultCache = {};
	if (that.resultCache.hasOwnProperty(term)) {
		that.displayResults(that.resultCache[term]);
	}
	else {
		$.yql("SELECT * FROM search.web WHERE query = '" + text + "'", queryCallback);
	}
	
}
yahooEngine.name = 'YAHOO';		


