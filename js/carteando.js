// general card control variables
var allCards = new Array();
var cardCount = 0;
var allCardIds;
var allCardTitles;
var csvData;

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
		.enter().append("div").attr("class", "col-lg-3 col-md-4 col-sm-6").append("div").attr("class", "card");

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

// ================================================ EXPORT TO CSV BTN
d3.select(".export-btn").on("click", function(d, i) {

	console.log("exporting csv ");
	console.log(allCards);

	var csvFile = "id,title,description\n";

	for (var i = 0; i < allCards.length; i++) {
		csvFile += "" + 
			allCards[i].id+","+
			allCards[i].title+","+
			allCards[i].description+"\n";
	};
	console.log(csvFile);

	var blob = new Blob([csvFile], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "carteando"+ new Date().toISOString()+".csv");
});


// ===================================================== IMPORT FROM CSV BTN

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	// Great success! All the File APIs are supported.
	console.log("files supported")
} else {
	alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
	console.log("handling file");
	var files = evt.target.files; // FileList object

	console.log(files);

	var reader = new FileReader();

	reader.readAsText(files[0]);

	reader.onload = function(theFile){
	    return function(e){
	        csvData = reader.result;
	        makeCardsFromCSV();
	    };
	}(files[0]);
}
$("#files").change(handleFileSelect);

function makeCardsFromCSV(){
	console.log("making cards from csv.")

	//clear previous data
	allCards = new Array();
	d3.selectAll(".card").remove();

	//allCards = CSVToArray(csvData.toString(), ",");
	//console.log(allCards);

	allCards = d3.csv.parse(csvData);
	console.log(allCards);

	var csvCards = d3.select(".card-container").selectAll(".card")
		.data(allCards)
		.enter().append("div").attr("class", "col-lg-3 col-md-4 col-sm-6").append("div").attr("class", "card");
	
	csvCards.append("h3").attr("class", "card-title")
		.text(function(d, i){
			console.log(d);
			return d.title;
		});

	csvCards.append("p").attr("class", "card-description")
		.text(function(d, i){
			return d.description;
		});

	csvCards.append("p").attr("class", "id-line").text(function (d) {
		  	return "Card no. " + d.id;
		});

addEditCardBtn(csvCards);
}



 // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    function CSVToArray( strData, strDelimiter ){
    	// Check to see if the delimiter is defined. If not,
    	// then default to comma.
    	strDelimiter = (strDelimiter || ",");

    	// Create a regular expression to parse the CSV values.
    	var objPattern = new RegExp(
    		(
    			// Delimiters.
    			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

    			// Quoted fields.
    			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

    			// Standard fields.
    			"([^\"\\" + strDelimiter + "\\r\\n]*))"
    		),
    		"gi"
    		);


    	// Create an array to hold our data. Give the array
    	// a default empty first row.
    	var arrData = [[]];

    	// Create an array to hold our individual pattern
    	// matching groups.
    	var arrMatches = null;


    	// Keep looping over the regular expression matches
    	// until we can no longer find a match.
    	while (arrMatches = objPattern.exec( strData )){

    		// Get the delimiter that was found.
    		var strMatchedDelimiter = arrMatches[ 1 ];

    		// Check to see if the given delimiter has a length
    		// (is not the start of string) and if it matches
    		// field delimiter. If id does not, then we know
    		// that this delimiter is a row delimiter.
    		if (
    			strMatchedDelimiter.length &&
    			(strMatchedDelimiter != strDelimiter)
    			){

    			// Since we have reached a new row of data,
    			// add an empty row to our data array.
    			arrData.push( [] );

    		}


    		// Now that we have our delimiter out of the way,
    		// let's check to see which kind of value we
    		// captured (quoted or unquoted).
    		if (arrMatches[ 2 ]){

    			// We found a quoted value. When we capture
    			// this value, unescape any double quotes.
    			var strMatchedValue = arrMatches[ 2 ].replace(
    				new RegExp( "\"\"", "g" ),
    				"\""
    				);

    		} else {

    			// We found a non-quoted value.
    			var strMatchedValue = arrMatches[ 3 ];

    		}


    		// Now that we have our value string, let's add
    		// it to the data array.
    		arrData[ arrData.length - 1 ].push( strMatchedValue );
    	}

    	// Return the parsed data.
    	return( arrData );
    }
