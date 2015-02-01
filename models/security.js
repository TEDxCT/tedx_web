// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  config.allow({
    insert : function () {
      return true;
    },
    update : function (doc) {
      return true;
    },
    remove : function () {
      return true;
    }
  });
  chapters.allow({
    insert : function () {
      return true;
    },
    update : function (doc) {
      return true;
    },
    remove : function () {
      return true;
    }
  });
  videos.allow({
    insert : function () {
      return true;
    },
    update : function (doc) {
      return true;
    },
    remove : function () {
      return true;
    }
  });
  favorites.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
  categories.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
  speakers.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
