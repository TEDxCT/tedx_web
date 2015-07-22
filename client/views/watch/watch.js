Template.live.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('simulcastMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });

    var allparties = live.find().fetch();
    allparties.forEach(function(party) {
      var partyLatlng = new google.maps.LatLng(party.location.A, party.location.F);

      var marker = new google.maps.Marker({
        position: partyLatlng,
        map: map.instance,
        title:"Hello World!"
      });

      var contentWindow = createContentWindow(party);

      google.maps.event.addListener(marker, 'click', function() {
        contentWindow.open(map.instance,marker);
      });
    });
  });
});

function createContentWindow(party) {
    var editbutton;

    var link;
    if(party.link){
      link = '<h3>Website</h3><p><a href="' + party.link + '" target="_blank">' + party.link + '</a></p>';
    }

    if(party.userId == Meteor.userId()) {
        editbutton = "<p>You're hosting! <a class='edit-party' href='parties/edit/" + party._id + "'>Edit this event</a>";
    }
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + party.title + '</h1>'+
      '<div id="bodyContent">'+
      '<h3>Entry</h3><p>' + party.entry + '</p>' + link +
      '<h3>Contact</h3><p>' + party.phone + '</p>' +
      editbutton +
      '</div>'+
      '</div>';

  var infoWindow = new google.maps.InfoWindow({
      content: contentString
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
        zoom: 12
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
        // var marker = new google.maps.Marker({
        //   position: mostLikelyLocation,
        //   map: map,
        //   title: 'Hello World!',
        //   icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'
        // });
        if (results[0].geometry.viewport) {
          map.fitBounds(results[0].geometry.viewport);
        }
      }
    });
  }
});
