let playerEndpoint = "http://nflarrest.com/api/v1/player/arrests/";

let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");

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
		console.log(json[0].Description);
	});
}); 