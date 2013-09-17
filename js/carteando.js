var allCards = new Array();
var cardCount = 0;
var allCardIds;
var allCardTitles;

var defaultCard = {id:0, title:"Default Title"};

$.fn.editable.defaults.mode = 'inline';





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

	newCard.append("textarea").attr("class", "card-title").text(function (d, i) {
		  	return allCards[i].title;
		}).attr("maxlength", "30").attr("contentEditable", "true");

	newCard.append("textarea").attr("class", "card-description").text("Click to add a card description...")
		.attr("maxlength", "120").attr("contentEditable", "true");

	newCard.append("p").attr("class", "id-line").text(function (d, i) {
		  	return "Card no. " + i;
		});

	$(".card-description").maxlength({
	    alwaysShow: false,
	    threshold: 10
	});

	$(".card-title").maxlength({
	    alwaysShow: false,
	    threshold: 10
	});
	
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
