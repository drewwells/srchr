/*
 * Add these to the Array prototype, IE doesn't support them
 */
if( typeof Array.prototype.unique !== 'function' ){
	Array.prototype.unique = function(){
		var r = new Array();
		o: for (var i = 0, n = this.length; i < n; i++) {
			for (var x = 0, y = r.length; x < y; x++) {
				if (r[x] == this[i]) 
					continue o; //o label on the outside for loop exists out and continues from there
			}
			r[r.length] = this[i];
		}
		return r;
	}
}

if (typeof Array.prototype.indexOf !== 'function') {
	Array.prototype.indexOf = function(obj){
		for (var i = 0; i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

var termBuilder = (function(){
	/*
	 * Struct of Arrays containing the terms, organized by the outside struct of systems
	 */
	var currentTerms = {},
	  queue = [],
    liHandle;
	
	/*
	 * I handle updating the term window on the front end
	 */
	var updateDisplay = function(){
		var item = '';
		var html = [];
		
		while (item = queue.pop()) {
			html.push('<li><span>');
			html.push(item);
			html.push('</span><a href=""><img class="yahoo" src="images/yahoo.jpg"/></a><a href=""><img class="flickr" src="images/flickr.jpg" /></a></li>');
		}
		liHandle.html(html.join(''));
	};
	
	var engineName = function(engine){
		if (typeof engine["name"] === 'undefined') {
			throw new Error("Invalid engine interface detected name not found.")
		}
		return engine["name"];
		
	};
	
	return {
	  //@element string of element id holding the term list
	  //   should be a li
	    configure: function(element,settings){
	      liHandle = $("#"+element);
	      
	    },
		// add a term to the previously queried list
		// refresh the display in the event of changes
		// @term - search term
		// @system - yahoo/flickr/other
		add: function(term,engine){//add a new term
			var system = engineName(engine);
			if( !currentTerms.hasOwnProperty(term)  ){
				currentTerms[term] = [];
			}
			queue.push(term);
			currentTerms[term].push(system);
			currentTerms[term] = currentTerms[term].unique();
		},
		// @term - search term
		// @system - yahoo/flickr/other
		remove: function(term, engine){//remove a term
			var removeTerm = (engine === term) ? true : false, item = (engine === term) ? term : engineName(engine);
			
			if (!currentTerms.hasOwnProperty(term)) {
				return false;
			}
			
			if (removeTerm && currentTerms.hasOwnProperty(item) ) { //remove an entire term
				delete currentTerms[item];
			}
			else {
				currentTerms[term].splice(currentTerms[term].indexOf(item), 1);
			}
			
		},
		getTerms: function(engine){
			var system = engineName(engine);
      
			return currentTerms[system];
		},
		render: updateDisplay
	}
}())
