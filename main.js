var map;
var infowindow;
var currentPosition;

window.onload = initMap;
function initMap() {
  var mapOptions = {
      center: {lat: 39, lng:-95},
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP 
      
  };
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  
  var firstLoc;
  var secondLoc;
  var infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  currentPosition = new google.maps.LatLng(43.08359, -77.66921);
  
  // Create the search box and link it to the UI element.
  var locationInput = document.getElementById('loc-input');
  var restaurantInput = document.getElementById('restaurant-input');
  var theaterInput = document.getElementById('theater-input');
  
  //limits search to cities
  var options = {
    types: ['(cities)']
  };
    
	var locationSearchBox = new google.maps.places.SearchBox(locationInput, options);
  
  //restaurant options
  options = {
    type: ['restaurant']
  };
  
  var restaurantSearchBox = new google.maps.places.SearchBox(restaurantInput);
  restaurantSearchBox.setTypes = ['restaurant'];
  
  var theaterSearchBox = new google.maps.places.SearchBox(theaterInput);
  

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    locationSearchBox.setBounds(map.getBounds());
    restaurantSearchBox.setBounds(map.getBounds());
    theaterSearchBox.setBounds(map.getBounds());
  });
  
  var markers = [];
  
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  locationSearchBox.addListener('places_changed', function() {
      var places = locationSearchBox.getPlaces();

      if (places.length == 0) {
        return;
      }


      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);

      });
      $('#restaurant-input').fadeIn();
      
      locationmarkers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        
        // Create a marker for each place.
       // locationmarkers.push(new google.maps.Marker({
         marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
           animation: google.maps.Animation.DROP
        });
        
        marker.addListener('click', markerInf);
        function markerInf() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
 
      };     
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
  });
  
  restaurantSearchBox.addListener('places_changed', function(){
    var places = restaurantSearchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    
    restaurantmarkers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      //restaurantmarkers.push(new google.maps.Marker({
        restmarker = new google.maps.Marker({
	    map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP

        });
        
        restmarker.addListener('click', restmarkerInf);
        
        if(place.rating)
        rate = place.rating;
        else
        rate = "N/A";
        
        if(place.website)
        site = '<a href="'+ place.website +'" target="_blank" style="text-decoration:none;"> Website </a>' ;      
        else
        site = '<p> No website </p>';
        
        function restmarkerInf() {
			infowindow.setContent('<div class="infobox">' + '<h3>' +  place.name + '</h3>'
			+ '</div>' + "Rating: " + rate + '<br>' + site + '<br>' +
			place.formatted_address + '<div class="selected">' + '<a href="#" id="sel" style="text-decoration: none;"> Select </a>' +'</div>');
			
		    infowindow.open(map, this);	
			document.getElementById ("sel").addEventListener ("click", selected);
          firstLoc = place.geometry.location;
        	};
        
        function selected(){
	        firstLoc = place.geometry.location;
          $('#theater-input').fadeIn();
          infowindow.close();
        };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      });
      map.fitBounds(bounds);
  });

  
  theaterSearchBox.addListener('places_changed', function(){
    var places = theaterSearchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    
    theatermarkers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      //theatermarkers.push(new google.maps.Marker({
	    theatermarker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP
        });
        
        theatermarker.addListener('click', theatermarkerInf);
        if(place.rating)
        rate = place.rating;
        else
        rate = "N/A";
        
        if(place.website)
        site = '<a href="'+ place.website +'" target="_blank" style="text-decoration:none;"> Website </a>' ;      
        else
        site = '<p> No website </p>';
           
        function theatermarkerInf() {
          infowindow.setContent('<div class="infobox">' + '<h3>' +  place.name + '</h3>'
			+ '</div>' +  "Rating: " + rate + '<br>' + site + '<br>' +
			place.formatted_address + '<div class="selected">' + '<a href="#" id="sel" style="text-decoration: none;"> Select </a>' +'</div>');

          infowindow.open(map, this);
          document.getElementById ("sel").addEventListener ("click", selected); 
      };
      
      function selected(){
	        secondLoc = place.geometry.location;
          calculateAndDisplayRoute(directionsService, directionsDisplay);
          infowindow.close();
        };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      });
      map.fitBounds(bounds);
  });
  var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel')); 
  //calculating and displaying the route.
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: firstLoc,
      destination: secondLoc,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        /*summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Distance: </b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }*/
      } else {
        console.log('Directions request failed due to ' + status);
      }
      
    });
  }
}
//end of init

//Your Position button
document.querySelector('#yourPositionZoomButton').onclick = function(){
  $('#restaurant-input').fadeIn();
  //getting user's location
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
            map.setZoom(15);  
            map.setCenter(currentPosition);
        },
        //errors
        function showError(error) {
          switch(error.code) {
          case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
              break;
          case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.")
              break;
          case error.TIMEOUT:
              console.log("The request to get user location timed out.")
              break;
          case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.")
              break;
          }
        });
    }
    else 
    {
        console.log("failed");
  }
}

     







