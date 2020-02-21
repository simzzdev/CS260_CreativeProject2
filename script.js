let playerEndpoint = "http://nflarrest.com/api/v1/player/arrests/";

let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");

searchBtn.addEventListener("click", function(e) {
	let playerName = searchBar.value;
	let request = fetch(playerEndpoint + playerName);
	let response = request.then(function (response) {
		return response.json();
	});
	request.catch(function(err) {
		alert(err);
	});
	response.then(function(json) {
		console.log(json[0].Description);
	});
});