var allCards = new Array();
var cardCount = 0;
var allCardIds;
var allCardTitles;

var defaultCard = {id:0, title:"Default Title"};

var front, back_content, back;

function Card(pId, pTitle){
	this.id = pId;
	this.title = pTitle;
}

d3.select(".new_card-btn").on("click", function(d, i){
	console.log("new_card clicked");
	cardCount++;

	var newCard = new Card(cardCount, "Default Title");
	allCards.push(newCard);
	console.log(newCard);
	console.log(allCards);

	newCard = d3.select(".card-container").selectAll(".card").data(allCards)
		.enter().append("div").attr("class", "card col-md-3");

	newCard.append("a").attr("class", "edit_card-btn btn btn-large btn-primary").text("Edit card")
		.on("click", function(d, i){
			console.log("clicked edit");

			back = flippant.flip(this.parentNode, 
				"<h3 class='card-title' contentEditable='true'>Add a title</h3>"+
				"<p class='card-description' contentEditable='true'>Add a card description</p>"+
				"<a class='save_card-btn btn btn-block btn-primary'>Save card</a>", "card");
		
			$(".save_card-btn").click(function(){
				console.log("clicked save");
				back.close();
			});
		});

	/* MAX-LENGTH STUFF WIP
		newCard.append("input").attr("class", "card-title").text(function (d, i) {
			  	return allCards[i].title;
			}).attr("maxlength", "30").attr("contentEditable", "true");

		newCard.append("textarea").attr("class", "card-description")
			.attr("placeholder", "Click to add a card description...")
			.attr("maxlength", "120");

		$(".card-description").maxlength({
		    alwaysShow: false,
		    threshold: 10
		});

		$(".card-title").maxlength({
		    alwaysShow: false,
		    threshold: 10
		});
	*/

	newCard.append("p").attr("class", "id-line").text(function (d, i) {
		  	return "Card no. " + i;
		});
});