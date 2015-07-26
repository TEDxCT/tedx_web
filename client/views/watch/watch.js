Template.live.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('simulcastMap', function(map) {
    // Add a marker to the map once it's ready

    var allparties = live.find().fetch();

    allparties.forEach(function(party) {
      var partyLatlng = new google.maps.LatLng(party.location.A, party.location.F);

      var marker = new google.maps.Marker({
        position: partyLatlng,
        map: map.instance
      });

      var contentWindow = createContentWindow(party);

      google.maps.event.addListener(marker, 'click', function() {
        contentWindow.open(map.instance,marker);
      });
    });
  });


});

function contentFromParty(partyFromDB) {
  var contentForMapMarker = "";

  // Open HTML content string
  contentForMapMarker = '<div id="content">';
  // Add content heading
  contentForMapMarker += '<h1 id="firstHeading" class="firstHeading">' + partyFromDB.title + '</h1>';
  contentForMapMarker += '<div id="bodyContent">';
  if ( ( partyFromDB.description != undefined ) || (partyFromDB.description != "" )) {
     contentForMapMarker += '<p>' + partyFromDB.description + '</p>';
  }
  contentForMapMarker += '<a href="/live/host/' + partyFromDB._id + '" class="btn btn-primary">View the event</a>';
  contentForMapMarker += '</div></div>';

  return contentForMapMarker;
}

function createContentWindow(party) {
    var editbutton;

  var infoWindow = new google.maps.InfoWindow({
      content: contentFromParty(party)
  });

  return infoWindow;
}

Template.live.helpers({
  simulcastMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      $("#autocomplete").geocomplete();

      // Map initialization options
      return {
        center: new google.maps.LatLng(-33.9248685,18.424055299999963),
        libraries: 'places',
        zoom: 10
      };
    }
  }
});

Template.live.events({
  'click .submit-search': function(event, template) {
    var searchTerm = $(template.find(".search")).val();
    var GeoCoder = new google.maps.Geocoder();

    var map = GoogleMaps.maps.simulcastMap.instance;
    GeoCoder.geocode({'address':searchTerm}, function(results, status) {
      if(status==google.maps.GeocoderStatus.OK) {
        var mostLikelyLocation = results[0].geometry.location;
        map.setCenter(mostLikelyLocation);
        if (results[0].geometry.viewport) {
          map.fitBounds(results[0].geometry.viewport);
        }
      }
    });
  }
});
