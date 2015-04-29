Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: 'TEDxCapeTown | Official Website',
        meta: {
          'description': 'Sparking deep discussion and connection in Cape Town and around the globe.'
        },
        // og: {
        //   'image': 'http://manuel-schoebel.com/images/authors/manuel-schoebel.jpg'
        // }
      });
    }
});
