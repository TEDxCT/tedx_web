SpeakerApplicationSchema = new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
    optional: false
  },
  lastName: {
    type: String,
    label: "Last Name",
    optional: false
  },
preferredName: {
    type: String,
    label: "Preferred Name",
    optional: false,
  },
email: {
    type: String,
    label: "Email Address",
    optional: false
},
cellphone: {
  type: Number,
  label: "Cellphone Number",
  optional: true
},
TEDProfileURL: {
  type: String,
  label: "URL to your TED.com profile",
  optional: false,
},
TEDTalks: {
  type: String,
  label: "The TED talk/s that inspire you",
  optional: false,
},
moreInfo: {
  type: String,
  label: "Where can we find out more about you?",
  optional: true,
},
ideaWorthSpreading: {
  type: String,
  label: "What is your idea worth spreading?",
  optional: false,
},
gender: {
    type: String,
    optional: true,
    label: "Gender",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Female", value: "female"},
          {label: "Male", value: "male"},
          {label: "Other", value: "other"}
        ];
      }
    }
  },
  ageGroup: {
    type: String,
    optional: true,
    label: "Age Group",
    autoform: {
      type: "select",
      options: function () {
        return [
          {label: "Younger than 18", value: "less than 18"},
          {label: "18-25", value: "18-25"},
          {label: "26-35", value: "26-35"},
          {label: "36-45", value: "36-45"},
          {label: "46-55", value: "46-55"},
          {label: "55-64", value: "55-64"},
          {label: "65+", value: "more than 65"}
        ];
      }
    }
  },
  race: {
  type: String,
  optional: true,
  label: "Race",
  autoform: {
    type: "select",
    options: function () {
      return [
        {label: "Prefer not to say", value: "Prefer not to say"},
        {label: "Black", value: "Black"},
        {label: "Coloured", value: "Coloured"},
        {label: "Indian/Asian", value: "Indian/Asian"},
        {label: "White", value: "White"},
        {label: "Other", value: "Other"},
      ];
    }
  }
}
});



SpeakerNominationSchema = new SimpleSchema({
speakerFirstName: {
    type: String,
    label: "Speaker First Name",
    optional: false
  },
speakerLastName: {
    type: String,
    label: "Speaker Last Name",
    optional: false
  },
nominatorFirstName: {
    type: String,
    label: "Your First Name",
    optional: false
  },
  nominatorLastName: {
    type: String,
    label: "Your Last Name",
    optional: false
  },
  nominatorEmail: {
    type: String,
    label: "Your Email Address",
    optional: false
  },
  speakerContact: {
    type: String, 
    label: "Please provide contact details/information for the speaker you want to nominate. This could be an e-mail address, a cellphone number, a website, or a social media account",
    optional: false
  },
  speakerIdea: {
    type: String,
    label: "What is this speakers' idea? and why is it worth spreading?",
    optional: false,
  }
});


SpeakerSchema = new SimpleSchema({
  createdAt: {
    type: Date,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      }
  },
  // Force value to be current date (on server) upon update
  // and don't allow it to be set upon insert.
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  speakerApplication: {
    type: SpeakerApplicationSchema,
    optional: true,
    custom: function () {
      if (Meteor.isClient) {
        var type = Session.get("speakerRegistrationType");
        var isApplicationType = type === "application";
        if (!isApplicationType) {
          return;
        }
        if (isApplicationType && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
          console.log("Application required");
          return "required";
        }
      }
    }
  },
  speakerNomination: {
    type: SpeakerNominationSchema,
    optional: true,
    custom: function () {
      if (Meteor.isClient) {
        var type = Session.get("speakerRegistrationType");
        var isNominationType = type === "nomination";
        if (!isNominationType) {
          return;
        }
        if (isNominationType && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
          return "required";
        }
      }
    }
  }
});

speakers.attachSchema(SpeakerSchema);