var engineInterface = (function() {
	var displayResults = function(q){
		var cont = $("#yahoo"),
			html = [],
			res = q.results.result;
		console.log(res)
		if ($.isArray(res)) {
			$.each(res, function(n, i) {
				html.push('<li>');
				html.push('<h3>');
				html.push('<a href=\"');
				html.push(i.clickurl);
				html.push('\" >');
				html.push(i.title)
				html.push('</a>');
				html.push('</h3>');
				html.push('<div>');
				html.push(i.abstract);
				html.push('</div>');
				html.push('<span clas=\"text\">');
				html.push(i.dispurl);
				html.push('</span> - <span>');
				html.push(Math.floor(i.size/1024));
				html.push('k</span>');
				html.push('</li>');
			});
			cont.html( html.join('') );
		}
	
	}
	return {
		query : { //struct containing result from query
			uri : '',
			results : {
				result: []
			},
			updated : ''
		}, 

		query : function(text) {
			var that = this, 
				text = text || 'SFO';
			var queryCallback = function(data) {
				if (!!data.error) {
					if (data.error.description) {
						console.log("YQL Error: " + data.error.description);
					}
				} else {
					that.query = data.query; //populate the query object with results.result[] and other elements stored in data.query
					displayResults(that.query);
				}
			}

			$.yql("SELECT * FROM search.web WHERE query = 'SFO'",
					queryCallback);

		}

	}
}());

