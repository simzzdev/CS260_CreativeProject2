let playerEndpoint = "http://nflarrest.com/api/v1/player/arrests/";
let suggestionsEndpoint = "http://nflarrest.com/api/v1/player?limit=";

let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");
let results = document.getElementById("results");
let searchSuggestions = document.getElementById("searchSuggestions");

Date.prototype.toNiceDateString = function() {
	let month = "";
	if (this.getMonth() == 0){month = "January"};
	if (this.getMonth() == 1){month = "February"};
	if (this.getMonth() == 2){month = "March"};
	if (this.getMonth() == 3){month = "April"};
	if (this.getMonth() == 4){month = "May"};
	if (this.getMonth() == 5){month = "June"};
	if (this.getMonth() == 6){month = "July"};
	if (this.getMonth() == 7){month = "August"};
	if (this.getMonth() == 8){month = "September"};
	if (this.getMonth() == 9){month = "October"};
	if (this.getMonth() == 10){month = "November"};
	if (this.getMonth() == 11){month = "December"};
	return month + " " + this.getDate() + ", " + this.getFullYear();
}

function searchPlayer(playerName) {
	let webRequest = fetch(playerEndpoint + playerName);
	let jsonRequest = webRequest.then(function (resp) {
		return resp.json();
	});
	webRequest.catch(function(err) {
		alert(err);
	});
	jsonRequest.then(function(json) {
		let totalHtml = "";
		document.getElementById("playerName").innerText = json[0].Name + ", " + json[0].Position_name;

		for (let i = 0; i < json.length; i++) {
			let crime = "<div class='crime' style='background-color:#" + json[i].Team_hex_color + "' >";
			let date = new Date(json[i].Date);
			crime += "<h2 class='crimeDate'>" + date.toNiceDateString() + "</h2>";
			crime += "<div class='teamDiv'>";
			let imgName = "images/teams/" + json[i].Team_preffered_name.toLowerCase().replace(" ", "-").replace(" ", "-") + ".png";
			crime += "<img width=36 height=36 src=" + imgName + " alt= ' ' />";
			crime += "<p class='teamName'>" + json[i].Team_preffered_name + "</p>";
			crime += "</div>";
			crime += "<p class='crimeCategory'> Crime - " + json[i].Category + "</p>";
			crime += "<p class='crimeDescription'> <strong>Description - </strong>" + json[i].Description + "</p>";
			crime += "<p class='crimeOutcome'> <strong>Outcome - </strong>" + json[i].Outcome + "</p>";
			crime += "</div>";
			crime += "</div>";
			totalHtml += crime;
		}
		results.innerHTML = totalHtml;
	});
}

searchBtn.addEventListener("click", function(e) {
	let playerName = searchBar.value;
	searchPlayer(playerName);	
});

function suggestionClicked(sender) {
	searchPlayer(sender.innerText);
};

// Load the list of suggested players
let suggestionsCount = Math.round(document.body.clientWidth / 80);
while (suggestionsCount % 3 !=0) {
	suggestionsCount--;
}
console.log(suggestionsCount);
let webRequest = fetch(suggestionsEndpoint + suggestionsCount);
let jsonRequest = webRequest.then(function (resp) {
	return resp.json();
});
webRequest.catch(function(err) {
	alert(err);
});
jsonRequest.then(function(json) {
	let totalHtml = "";
	let rowLength = json.length / 3;
	for (let i = 0; i < rowLength; i++) {
		let html = `<a onclick="suggestionClicked(this)">` + json[i].Name + `</a>`;
		if (i != rowLength - 1)
			html += " | ";
		totalHtml += html;
	}	
	totalHtml += "<p />";
	for (let i = rowLength; i < rowLength * 2; i++) {
		let html = `<a onclick="suggestionClicked(this)">` + json[i].Name + `</a>`;
		if (i != (rowLength * 2) - 1)
			html += " | ";
		totalHtml += html;
	}
	totalHtml += "<p />";
	for (let i = rowLength * 2; i < json.length; i++) {
		let html = `<a onclick="suggestionClicked(this)">` + json[i].Name + `</a>`;
		if (i != json.length - 1)
			html += " | ";
		totalHtml += html;
	}
	searchSuggestions.innerHTML = totalHtml;
});
