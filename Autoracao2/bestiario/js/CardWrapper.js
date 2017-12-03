var CardWrapper = (function(){
	// Constructor
	function CardWrapper(entity){
		this.name = entity.children[0].textContent;
		this.status = [
			entity.children[1].textContent,
			entity.children[2].textContent,
			entity.children[3].textContent,
			entity.children[4].textContent
		]
		this.align = entity.children[5].textContent;
	}
	return CardWrapper;
})();
