var spotifyArtistBaseURL = "https://v6ssyzr7m2.execute-api.us-east-2.amazonaws.com/prod/spotifySearch?q="
var spotifyAlbumBaseURL = "https://v6ssyzr7m2.execute-api.us-east-2.amazonaws.com/prod/spotifySearch?id="


function spotifySearch (artistSearch) {
	console.log("=======spotify==========")
	var spotifySection = $("#spotify-row");
	//Condition where the artist name has a space
	var artistWithSpace = artistSearch;
	// var artistWithSpace = "drake"
	var artist = artistWithSpace.split(" ").join("+");


	var spotifyArtistURL = spotifyArtistBaseURL+artist
	console.log("======= Spotify artist URL : " +spotifyArtistURL+ "==========")

	$.ajax({
		url: spotifyArtistURL,
		type: "GET",
        cors: true ,
	}).done(function(artistIdData){
		console.log("=======spotify==========")
		console.log(artistIdData)
		console.log("======= spotify arist ID ========")
		var artistID = artistIdData.artists.items[0].id
		var artistName = artistIdData.artists.items[0].name
		console.log(artistID)
		console.log(artistName)

		if (artistID) {
			var spotifyIdURL = spotifyAlbumBaseURL+artistID
			console.log("Spotify artist id URL : ==== " + spotifyIdURL)
			$.ajax({
				url: spotifyIdURL,
				type: "GET",
				cors: true,
			}).done(function(albumData) {
				console.log("Album Data for Spotify ---- ")
				console.log(albumData)

				spotifySection.empty();

				//loop through and add albums
				var spotifyEmbed  = (albumData.items[0].uri);
				var spotifyAlbumURI = "https://open.spotify.com/embed?uri="+spotifyEmbed+"&theme=black"
				// spotifyIframe.attr("src", spotifyAlbumURI);
				var col5Div = $('<div class="col-sm-12">');

				console.log("---- Spotify URL : ====== " + spotifyAlbumURI )
				console.log("---- Spotify Name : ====== " + albumData.items[0].name)
				col5Div.html('<iframe src="'+spotifyAlbumURI+'" width="100%" height="400" frameborder="0" allowtransparency="true" ></iframe>');
				spotifySection.append(col5Div)
				console.log("---- spotify append is hapenning ----")

			})
		}
	})
}



$(document).ready(function() {
	$("#searchButton").on("click", function(){
		spotifySearch($("#search").val());
	})
})