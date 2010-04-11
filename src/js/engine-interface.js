
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
//		console.log(q);
			var  html = [], 
				res = q.results.result || q.results.photo,
				$cont = $(this.cont);
			$cont.addClass('show');
				
			if ( typeof res !== 'undefined' && $.isArray(res) ) {
				$.each(res, function(n, i){
					html.push('<li>');
					html.push('<h3>');
					if( !!i.url ){
						html.push('<a href="');
						html.push(i.url);
						html.push('">');
					}
					html.push(i.title);
					if( !!i.url ) {
						html.push('</a>');
					}
					html.push('</h3>');
					html.push('<div>');
					html.push(i["abstract"])
					html.push('</div>');
					
					if( !!i.special ){
						html.push('<p>');
						html.push( i.special );
						html.push('</p>');
					}
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

