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
		for (let i = 0; i < json.length; i++) {
			var html = "<h3>" + json[i].Name + "</h3><h6>" + json[i].Description + "</h6>";
			totalHtml += html;
			
		}
		results.innerHTML = totalHtml;
	});
});