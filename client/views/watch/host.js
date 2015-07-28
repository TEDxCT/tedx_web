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
  "keyup .partyDescription": function() {
    setFieldOnSessionObject("draftViewingParty", "description", $(".partyDescription").val());
  },
  "keyup .entryFee": function() {
    setFieldOnSessionObject("draftViewingParty", "entry", $(".entryFee").val());
  },
  // "click #private": function() {
  //   setFieldOnSessionObject("draftViewingParty", "privateParty", $("#private").is(":checked"));
  // },
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
  "click .chooseLocationLink": function() {
    if(validateForm("partyDetailsForm", {})) {
      Router.go('hostlocation');
    }
  }
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

Template.hosted.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.

  GoogleMaps.ready('singlePartyMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.hosted.helpers({
  singlePartyMapOptions: function() {
    var self = this;
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(this.location.A,this.location.F),
        libraries: 'places',
        zoom: 16
      };
    }
  },
  email: function() {
    if ( ( this.email != "" ) && ( this.email != undefined ) ) {
      if(!this.privateEmail) {
        return true;
      }
    }
    return false;
  },
  phone: function() {
    if ( ( this.phone != "" ) && ( this.phone != undefined ) ) {
      if(!this.privatePhone) {
        return true;
      }
    }
    return false;
  },
  ownsEvent: function () {
    if(this.userId==Meteor.userId()) return true;
    else return false;
  }
});

Template.hosted.events({
  'click .seeContactInfo': function() {
    Session.set()
  },
  'click .delete': function() {
    live.update({"_id": this._id}, {$set: {"archived": true}});
  }
})

function searchLocation(searchTerm) {
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
      setFieldOnSessionObject("draftViewingParty", "givenAddress", searchTerm);
      if (results[0].geometry.viewport) {
        map.fitBounds(results[0].geometry.viewport);
      }
    }
  });
}

Template.hostLocation.events({
  'click .submit-search': function(event, template) {
    var searchTerm = $(template.find(".search")).val();
    searchLocation(searchTerm);
  },
  'keypress .search': function (event, template) {
    if (event.which === 13) {
      var searchTerm = $(template.find(".search")).val();
      searchLocation(searchTerm);
    }
  },
  'click .save': function() {
    var viewingPartyForSaving = Session.get("draftViewingParty");

    var savedViewingParty;
    if(validateForm("partyLocationForm")) {
      if(viewingPartyForSaving._id != undefined) {
        // saving and then removing ID off the object for saving because it would try change the documents ID
        var idForSaving = viewingPartyForSaving._id;
        delete viewingPartyForSaving._id;
        savedViewingParty = live.update({"_id": idForSaving}, {$set: viewingPartyForSaving});
        Session.set("draftViewingParty", undefined);
        Router.go("hosted", {"_id": idForSaving});
      }
      else {
        savedViewingParty = live.insert(viewingPartyForSaving);
        Session.set("draftViewingParty", undefined);
        Meteor.call('sendEmail',
            Meteor.user().emails[0].address,
            'bob@example.com',
            'Your event is set up!',
            'Thanks for setting up your event. Find it here http://live.tedxcapetown.org/live/host/' + savedViewingParty);
        Router.go("hosted", {"_id": savedViewingParty});
      }
    }
  }
});

function validateForm(formID, fieldsToExclude) {
  var numberOfInvalidFields = 0;
  $('#' + formID + ' *').filter(':input').each(function(index, value){
    if(value.value.toString()=="") {
      $('#' + formID + ' *').filter(':input')[index].attributes.class.value += " error";
      numberOfInvalidFields++;
    }
  });
  if(numberOfInvalidFields==0) return true;
  else return false;
}
