Meteor.startup(function() {
  if(Meteor.isClient){
    loadFilePicker('A3zo8DgItQxiOLaCAjmwUz');

    var options = {
      keepHistory: 1000 * 60 * 5,
      localSearch: true
    };
    var fields = ['title', 'description'];

    VideosSearch = new SearchSource('videos', fields, options);
  }
});
