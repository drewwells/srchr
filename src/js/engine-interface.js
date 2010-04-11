
/*
 * In case browser does not support this functionality
 * Courtesy Douglas Crockford
 */
if (typeof Object.create !== 'function') {
	Object.create = function(o){
		function F(){}
		F.prototype = o;
		return new F();
	};
}

var engineInterface = (function(){
	
	return {
		configure: function(container){
			this.cont = container;
			return this;
		},
		cont: '',
		displayResults: function(q){
			var  html = [], 
				res = q.results.result || q.results.photo,
				$cont = $(this.cont);
			//Normalize response
			if( !!q.results.photo ){
				$.each(res,function(n,i){
					i.clickurl = "http://farm" + i.farm + ".static.flickr.com/" + i.server + "/" + i.id + "_" + i.secret + ".jpg";
					i["abstract"] = i.title;
					i.title = "<img src=\"" + i.clickurl + "\" />";
					i.size = 0;
					i.dispurl = '';
				});
			}	
				
			if ( typeof res !== 'undefined' && $.isArray(res) ) {
				$.each(res, function(n, i){
					html.push('<li>');
					html.push('<h3>');
					html.push(i.title);
					html.push('</h3>');
					html.push('<div>');
					html.push(i["abstract"])
					html.push('</div>');
					//html.push('<span clas=\"text\">');
					//html.push(i.dispurl);
					//if( i.size > 0 ){
					//	html.push('</span> - <span>');
					//	html.push(Math.floor(i.size / 1024));
					//	html.push('k</span>');
					//}
					html.push('</li>');
				});
				if( !!$cont ){
					$cont.html(html.join(''));
				}
			} 
		},
		resultCache: {},
		
		query: { //struct containing result from query
			uri: '',
			results: {
				result: []
			},
			updated: ''
		},
		
		
		search: function(term){
			alert('You must define your own search function!')
		},
		name: 'engine'
	}
}());

