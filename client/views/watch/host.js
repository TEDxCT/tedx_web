Template.hostDetails.onCreated(function() {
  if(Session.get("draftViewingParty") == undefined) {
    var newViewingParty = new Object();
    newViewingParty.privateParty = false;
    Session.set("draftViewingParty", newViewingParty);
  }
});

Template.hostDetails.helpers({
  "party": function() {
    return Session.get("draftViewingParty");
  },
  "checked": function(fieldValue) {
    if(fieldValue) return "checked";
  }
})

Template.hostDetails.events({
  "keyup .partyName": function() {
    setFieldOnSessionObject("draftViewingParty", "title", $(".partyName").val());
  },
  "keyup .entryFee": function() {
    setFieldOnSessionObject("draftViewingParty", "entry", $(".entryFee").val());
  },
  "click #private": function() {
    setFieldOnSessionObject("draftViewingParty", "privateParty", $("#private").is(":checked"));
  },
  "keyup .fullName": function() {
    setFieldOnSessionObject("draftViewingParty", "fullName", $(".fullName").val());
  },
  "keyup .phoneNumber": function() {
    setFieldOnSessionObject("draftViewingParty", "phone", $(".phoneNumber").val());
  },
  "click .showPhone": function() {
    setFieldOnSessionObject("draftViewingParty", "privatePhone", $(".showPhone").is(":checked"));
  },
  "keyup .emailAddress": function() {
    setFieldOnSessionObject("draftViewingParty", "email", $(".emailAddress").val());
  },
  "click .showEmail": function() {
    setFieldOnSessionObject("draftViewingParty", "privateEmail", $(".showEmail").is(":checked"));
  },
})

function setFieldOnSessionObject(objectName, fieldName, fieldValue) {
  var sessionObject = Session.get(objectName);
  check(sessionObject, Object);
  sessionObject[fieldName] = fieldValue;
  if (Meteor.userId()) {
    sessionObject.userId = Meteor.userId();
  }
  Session.set(objectName, sessionObject);
}

Template.hostLocation.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('simulcastMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.hostLocation.helpers({
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

Template.hostLocation.events({
  'click .submit-search': function(event, template) {
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
        setFieldOnSessionObject("draftViewingParty", "location", mostLikelyLocation);
        if (results[0].geometry.viewport) {
          map.fitBounds(results[0].geometry.viewport);
        }
      }
    });
  },
  'click .save': function() {
    var viewingPartyForSaving = Session.get("draftViewingParty");
    var savedViewingParty = live.insert(viewingPartyForSaving);
    Router.go("hosted", {"_id": savedViewingParty});
  }
});
