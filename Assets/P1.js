$(document).ready(function(){
	// Making API calls
	var apiBaseURL = 'http://api.themoviedb.org/3/';
	var api_key = "082abfc22bbb361972b9847864f6e7e0";
	var apiKey = "e61e9fb239b05528d06ac5dc3e44f900";

	// Base URL of image
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

	//shows data name when entered a specific movie
	function getNowPlayingData(){
		$.getJSON(nowPlayingURL, function(nowPlayingData){
			 console.log(nowPlayingData);
			
			for(let i = 0; i<nowPlayingData.results.length; i++){
				
				var mid = nowPlayingData.results[i].id;
				
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;
				

				$.getJSON(thisMovieUrl, function(movieKey){
					
					

					

					var poster = imageBaseUrl+'w300'+nowPlayingData.results[i].poster_path;
					

					var title = nowPlayingData.results[i].original_title;

					var releaseDate = nowPlayingData.results[i].release_date;

					var overview = nowPlayingData.results[i].overview;
					// $('.overview').addClass('overview');

								
					
					var youtubeKey = movieKey.results[0].key;

					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					// console.log(youtubeLink)

					var nowPlayingHTML = '';
					
					nowPlayingHTML += '<div class="col-md-3 eachMovie">';
					nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
					nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
					nowPlayingHTML += '<div class="modal-dialog" role="document">';
					nowPlayingHTML += '<div class="modal-content col-sm-12">';
					nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
					nowPlayingHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
                    nowPlayingHTML += '</div><br>';
                                    
					nowPlayingHTML += '<div class="col-sm-8 movieDetails">';
					nowPlayingHTML += '<div class="movieName">'+title+'</div><br>';
					nowPlayingHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
					nowPlayingHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
										
					nowPlayingHTML += '<div class="overview">' +overview+ '</div><br>';
			
					
			
					$('#movie-grid').append(nowPlayingHTML);
					//added this line to display image posters
					
				})
			}
		}) 
    }
    getNowPlayingData();
	
	

	//Reset HTML strings to empty to overwrite with new one!
	var nowPlayingHTML = '';
	

	$('.navbar-brand').click(function(){
		getNowPlayingData();
		$('#movie-grid').html(nowPlayingHTML);
		
	})		
	$('.nowPlaying').click(function(){
		getNowPlayingData();
		$('#movie-grid').html(nowPlayingHTML);
		
	})
	
	
	// Search Function //
	
    var searchTerm = '';
	searchMovies();
	//reference entire search form
	$('.searchForm').submit(function(event){
		$('#movie-grid').html('');
		event.preventDefault();
		
		searchTerm = $('.form-control').val();
		searchMovies();
	})

	function searchMovies(){
		//need to include query in url. 
		const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
			// console.log(searchMovieURL);
		$.getJSON(searchMovieURL, function(movieSearchResults){
			// console.log(movieSearchResults);
			for (let i = 0; i<movieSearchResults.results.length; i++){
				var mid = movieSearchResults.results[i].id;
				var thisMovieUrl = apiBaseURL+'movie/'+mid+'/videos?api_key=' + apiKey;		

				$.getJSON(thisMovieUrl, function(movieKey){
					// console.log(movieKey)
					var poster = imageBaseUrl+'w300'+movieSearchResults.results[i].poster_path;
					var title = movieSearchResults.results[i].original_title;
					var releaseDate = movieSearchResults.results[i].release_date;
					var overview = movieSearchResults.results[i].overview;
									
					var youtubeKey = movieKey.results[0].key;
					var youtubeLink = 'https://www.youtube.com/watch?v='+youtubeKey;
					var searchResultsHTML = '';
					    searchResultsHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
						searchResultsHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal'+ i + '" data-whatever="@' + i + '">'+'<img src="'+poster+'"></button>'; 	
						searchResultsHTML += '<div class="modal fade" id="exampleModal' + i +'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
						searchResultsHTML += '<div class="modal-dialog" role="document">';
						searchResultsHTML += '<div class="modal-content col-sm-6 col-lg-6">';
						searchResultsHTML += '<div class="col-sm-6 moviePosterInModal">';
						searchResultsHTML += '<a href="'+youtubeLink+'"><img src="'+poster+'"></a>'; 
						searchResultsHTML += '</div><br>';//close trailerLink
						searchResultsHTML += '<div class="col-sm-8 movieDetails">';
						searchResultsHTML += '<div class="movieName">'+title+'</div><br>';
						searchResultsHTML += '<div class="linkToTrailer"><a href="'+youtubeLink+'"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';	
						searchResultsHTML += '<div class="release">Release Date: '+releaseDate+'</div><br>';
						searchResultsHTML += '<div class="overview">' +overview+ '</div><br>';
				
				
					$('#movie-grid').append(searchResultsHTML);//adds search results to the new html
					//Label will be whatever user input was
					$('#movieGenreLabel').html(searchTerm);	
				})
			}
		})
	}
});
