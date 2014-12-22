// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
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
}
