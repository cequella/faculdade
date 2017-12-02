var XMLManager = (function(){
	// Constructor
	function XMLManager(src, onload){
		this.xmlhttp;
		this.xml;
		this.ready = false;
		setup.call(this, src, onload);
	}

	// Private
	function setup(src, onload){
		// Start XML
		if (window.XMLHttpRequest) {
			this.xmlhttp = new XMLHttpRequest();
		} else {
			this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		// Read
		this.xmlhttp.overrideMimeType('text/xml');
		this.xmlhttp.onreadystatechange = ()=>{
			if (this.xmlhttp.readyState == XMLHttpRequest.DONE && this.xmlhttp.status == 200) {
				this.xml = this.xmlhttp.responseXML;
				this.ready = true;
				onload();
			}
		};
		this.xmlhttp.open("GET", src, true);
		this.xmlhttp.send();
	};

	// Public

	return XMLManager;
})();
