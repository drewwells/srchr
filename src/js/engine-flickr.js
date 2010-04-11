var flickrEngine = Object.create(engineInterface);
flickrEngine.normalizeQ = function(q){	//Normalize response
	var imgURL = '', imgTURL = '', imgClickURL = '';
	q.results.result = q.results.photo;
	q.results.result = $.map(q.results.result,function(i,n){
		imgTURL = "http://farm" + i.farm + ".static.flickr.com/" + i.server + "/" + i.id + "_" + i.secret + "_t.jpg";
		imgURL = "http://farm" + i.farm + ".static.flickr.com/" + i.server + "/" + i.id + "_" + i.secret + ".jpg";
		imgClickURL = "http://www.flickr.com/photos/" + i.owner + "/" + i.id + "/";
	  //console.log(q);
		return {
			"url": imgURL,
			"abstract": i.title,
			"title": "<a href=\"" + imgClickURL + "\"><img src=\"" + imgTURL + "\" /></a>",
			"special": '<a class="special" href="' + imgURL + '">Click to zoom</a>'
		}
	});
	return q;
},
flickrEngine.search = function(term){
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
			that.displayResults( that.normalizeQ(query) );
		}
	}
	if( !that.hasOwnProperty('resultCache') ) that.resultCache = {};
	if (that.resultCache.hasOwnProperty(term)) {
		that.displayResults(that.resultCache[term]);
	}
	else {
		
		$.ajax({
			type: "get",
			url: ("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20text%3D%22" + escape(text) + "%22&format=json"),
			dataType: "jsonp",
			success: queryCallback
		});
		
	}
	
}
flickrEngine.name = 'FLICKR';		


