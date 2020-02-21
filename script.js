let playerEndpoint = "http://nflarrest.com/api/v1/player/arrests/";

let searchBtn = document.getElementById("searchBtn");
let searchBar = document.getElementById("searchBar");

searchBtn.addEventListener("click", function(e) {
	let req = fetch(playerEndpoint + "Michael%20Vick");
	let resp = req.then(function (resp) {
		return resp.json();
	});
	req.catch(function(err) {
		alert(err);
	});
	resp.then(function(json) {
		console.log(json[0].Description);
	});
});