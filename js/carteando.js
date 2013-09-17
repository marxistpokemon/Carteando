// general card control variables
var allCards = new Array();
var cardCount = 0;
var allCardIds;
var allCardTitles;

// a helper object for def. values
var defaultCard = {id:0, title:"Default Title", description:"Edit the card description..."};

// flippant-related variables
var front, back_content, back;

function Card(pId, pTitle, pDescription){
	this.id = pId;
	this.title = pTitle;
	this.description = pDescription;
}

function addEditCardBtn(obj){
	obj.append("a").attr("class", "edit_card-btn btn btn-large btn-primary")
	.text("Edit card")
	.on("click", function(d, i){
		console.log("clicked edit");

		front = this.parentNode.parentNode;
		console.log(front);

		var back_content_node = d3.select(this.parentNode);
		console.log(back_content_node.datum());

		back_content_node.select(".edit_card-btn").remove();
		back_content_node.select(".card-title").attr("contentEditable", "true");
		back_content_node.select(".card-description").attr("contentEditable", "true");

		back_content = back_content_node.html() +
			"<a class='save_card-btn btn btn-block btn-primary'>Save card</a>";
		//console.log(back_content);

		back = flippant.flip(front, back_content, "card");


	
		d3.select(back).select(".save_card-btn").on("click", function(d, i){
			console.log("save_card clicked");

			var savedCard = back_content_node.datum();

			allCards[savedCard.id-1].title = d3.select(this.parentNode).select(".card-title")
				.text();
			allCards[savedCard.id-1].description = d3.select(this.parentNode).select(".card-description")
				.text();

			this.parentNode.close();

			d3.selectAll(".card").each(function(d, i){
				if(d == allCards[savedCard.id-1]){
					d3.select(this).select(".card-title").text(d.title)
						.attr("contentEditable", "false");
					d3.select(this).select(".card-description").text(d.description)
						.attr("contentEditable", "false");
					addEditCardBtn(d3.select(this));	
				}					
			});
		});
	});
}

// ========================== NEW CARD BTN CLICK

d3.select(".new_card-btn").on("click", function(d, i){
	console.log("new_card clicked");
	cardCount++;

	var newCard = new Card(cardCount, defaultCard.title, defaultCard.description);
	allCards.push(newCard);

	var allNewCards = d3.select(".card-container").selectAll(".card").data(allCards)
		.enter().append("div").attr("class", "col-md-3").append("div").attr("class", "card");

	allNewCards.append("h3").attr("class", "card-title")
		.text(defaultCard.title);
	allNewCards.append("p").attr("class", "card-description")
		.text(defaultCard.description);

	allNewCards.append("p").attr("class", "id-line").text(function (d) {
		  	return "Card no. " + d.id;
		});

	addEditCardBtn(allNewCards);

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
});