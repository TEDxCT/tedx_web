Template.live.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('simulcastMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.live.helpers({
  simulcastMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      $("#autocomplete").geocomplete();

      // Map initialization options
      return {
        center: new google.maps.LatLng(-33.9248685,18.424055299999963),
        libraries: 'places',
        zoom: 12
      };
    }
  }
});

Template.live.events({
  'keypress .search': function(event, template) {
    var searchTerm = $(template.find(".search")).val();
    var GeoCoder = new google.maps.Geocoder();
    var map = GoogleMaps.maps.simulcastMap.instance;
    GeoCoder.geocode({'address':searchTerm}, function(results, status) {
      if(status==google.maps.GeocoderStatus.OK) {
        var mostLikelyLocation = results[0].geometry.location;
        map.setCenter(mostLikelyLocation);
        var marker = new google.maps.Marker({
          position: mostLikelyLocation,
          map: map,
          title: 'Hello World!',
          icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'
        });
        if (results[0].geometry.viewport) {
          map.fitBounds(results[0].geometry.viewport);
        }
      }
    });
  }
});
