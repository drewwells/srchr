
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
		displayResults: function(q){
			var  html = [], 
				res = q.results.result || q.results.photo;
			//Normalize response
			if( !!q.results.photo ){
				$.each(res,function(n,i){
					i.clickurl = "http://flickr.com/photo.gne?id=" + i.id;
					i["abstract"] = i.title;
					i.title = "<img src=\"http://flickr.com/photo.gne?id=" + i.id + "\" />";
					i.size = 0;
					i.dispurl = '';
				});
			}	
				
			if ($.isArray(res)) {
				$.each(res, function(n, i){
					html.push('<li>');
					html.push('<h3>');
					html.push(i.title);
					html.push('</h3>');
					html.push('<div>');
					html.push(i.description)
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
				if( !!cont ){
					cont.html(html.join(''));
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

