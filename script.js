let playerEndpoint = "http://nflarrest.com/api/v1/player/arrests/";
let suggestionsEndpoint = "http://nflarrest.com/api/v1/player?limit=10";

let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");
let results = document.getElementById("results");
let searchSuggestions = document.getElementById("searchSuggestions");

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
		document.getElementById("playerName").innerText = json[0].Name + " " + json[0].Position_name;

		for (let i = 0; i < json.length; i++) {
			let crime = "<div class='crime' style='background-color:#" + json[i].Team_hex_color + "' >";
			crime += "<p class='crimeDate'>" + json[i].Date + "</p>";
			crime += "<div class='teamDiv'>";
			crime += "<img src='' alt= ' ' />";
			crime += "<p class='teamName'>" + json[i].Team_preffered_name + "</p>";
			crime += "</div>";
			crime += "<p class='crimeDate'>" + json[i].Category + "</p>";
			crime += "<p class='crimeDescription'>" + json[i].Description + "</p>";
			crime += "<p class='crimeOutcome'>" + json[i].Outcome + "</p>";
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
let webRequest = fetch(suggestionsEndpoint);
let jsonRequest = webRequest.then(function (resp) {
	return resp.json();
});
webRequest.catch(function(err) {
	alert(err);
});
jsonRequest.then(function(json) {
	let totalHtml = "";
	let rowLength = json.length / 2;
	for (let i = 0; i < rowLength; i++) {
		let html = `<a onclick="suggestionClicked(this)">` + json[i].Name + `</a>`;
		if (i != rowLength - 1)
			html += " | ";
		totalHtml += html;
	}	
	totalHtml += "<br />";
	for (let i = rowLength; i < json.length; i++) {
		let html = `<a onclick="suggestionClicked(this)">` + json[i].Name + `</a>`;
		if (i != json.length - 1)
			html += " | ";
		totalHtml += html;
	}
	searchSuggestions.innerHTML = totalHtml;
});
