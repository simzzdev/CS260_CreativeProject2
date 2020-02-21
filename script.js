let playerEndpoint = "http://nflarrest.com/api/v1/player/arrests/";

let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");
let results = document.getElementById("results");

searchBtn.addEventListener("click", function(e) {
	let playerName = searchBar.value;
	let webRequest = fetch(playerEndpoint + playerName);
	let jsonRequest = webRequest.then(function (resp) {
		return resp.json();
	});
	webRequest.catch(function(err) {
		alert(err);
	});
	jsonRequest.then(function(json) {
		let totalHtml = "";


		document.getElementById("playerName").innerText = json[i].Name;

		for (let i = 0; i < json.length; i++) {
			let crime = "<div class='crime' style=background-color: lightblue>";
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
});