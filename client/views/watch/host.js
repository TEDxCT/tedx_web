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
  'submit form': function(event){
    event.preventDefault();
  },
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
  'submit form': function(event){
    event.preventDefault();
    if (event.which === 13) {
      var searchTerm = $(template.find(".search")).val();
      searchLocation(searchTerm);
    }
  },
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
            'hello@tedxcapetown.org',
            "You've successfully registered a viewing party!",
            emailBodyHtml(savedViewingParty,  viewingPartyForSaving.fullName));
        Router.go("hosted", {"_id": savedViewingParty});
      }
    }
  }
});

function validateForm(formID, fieldsToExclude) {
  var numberOfInvalidFields = 0;
  $('#' + formID + ' *').filter(':input').each(function(index, value){
    if(value.value.toString()=="") {
      $('#' + formID + ' *').find(':input')[index].attributes.class.value += " error";
      numberOfInvalidFields++;
    }
  });
  if(numberOfInvalidFields==0) return true;
  else return false;
}

function emailBodyHtml(savedViewingParty, firstName)  {
  var emailBody = "<p>Dear " + firstName + ",</p><p>Congratulations! You've successfully registered a viewing party for TEDxCapeTown2015. We're thrilled to have you taking part.</p><p>Here's the link to your viewing party: http://live.tedxcapetown.org/live/host/" + savedViewingParty + "</p><p><strong>Please note:</strong></p><p>Your TEDxCapeTown viewing party  must be free to attendees. You may ask attendees to bring a plate of food or charge 'a hug' for entry, (for example) but you may not sell tickets to your viewing party. There's no limit on audience size, if you're showing the livestream only. However, if you're inviting local speakers, the normal TEDx rules regarding event size apply.</p><p>Event: TEDxCapeTownLive<br>Event date: Saturday 15th August 2015<br>Event type: TEDxLive<br></p><p><strong>Your next steps</strong></p><ol><li>Download the Viewing Party Toolkit: We've put together some helpful suggestions to make sure your viewing party is a TED success. You can download the toolkit from our website or <a href='http://www.tedxcapetown.org/Viewing%20party%20toolkit.pdf' target='_blank'>click here</a>.</li><li>In the meantime, please review the minimum hardware requirements to ensure your system can handle the livestream. If you have any further questions related to registration or to streaming/technical requirements, please contact us at Support@tedxcapetown.org</li><li>Confirm that the information on your TEDxCapeTown viewing party page is correct. As a licensee, you can access and edit your event page (login required). Please keep this page updated with all relevant information on your TEDxCapeTown viewing party: venue, time and a short description about what attendees can expect.</li><li>Invite your friends and let people know you are hosting a TEDxCapeTown viewing party. Share your viewing party on Facebook and Twitter using the tag #TEDxCT</li><li>Let us know you're hosting a viewing party and engage with us on the event day. Post your event on our Facebook page and tweet us @TedxCapeTown and use the tag #TEDxCT. Send us pics of your viewing party (even if it ends up being just you in your pajamas) via email (hello@tedxcapetown.org) or on twitter (@TEDxCapeTown) and we might send you a shout out live from our TED stage.</li><li>Read through the TEDx rules.</li><p>We're so excited to have you with us on this amazing journey.</p><p>Best,</p><p>The TEDxCapeTown Team</p>"

  return emailBody;
}
