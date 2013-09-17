var allCards = new Array();
var cardCount = 0;
var allCardIds;
var allCardTitles;

var defaultCard = {id:0, title:"Default Title"};

$.fn.editable.defaults.mode = 'inline';

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

	

	newCard.append("a").attr("class", "edit_card-btn btn btn-block btn-primary").text("Edit card")
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

	/*
	newCard.append("input").attr("class", "card-title").text(function (d, i) {
		  	return allCards[i].title;
		}).attr("maxlength", "30").attr("contentEditable", "true");

	newCard.append("textarea").attr("class", "card-description")
		.attr("placeholder", "Click to add a card description...")
		.attr("maxlength", "120");
	*/

	newCard.append("p").attr("class", "id-line").text(function (d, i) {
		  	return "Card no. " + i;
		});

	/*
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


/*
d3.selectAll(".card").data(allCards)
.enter().append("p").attr("class", "id-line").text(function (d, i) {
  	return "Card no. " + i;
});;
*/




/*
$(".new_card-btn").click(function() {
  $(".card-container").append("<div class='card'></div>").html();
  var auxCards = $(".card");
  allCards = $.makeArray(auxCards);
  console.log(allCards);

  var test = d3.selectAll("div.card").each(function (d, i) {
  	d3.select(this).text("Card no. " + i);
  });
  console.log(test);
});
*/
