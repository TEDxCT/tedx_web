Meteor.startup(function() {
  if(Meteor.isClient){
    mixpanel.init("9976e885df4bcd8d87deb6285612820c");
    loadFilePicker('A3zo8DgItQxiOLaCAjmwUz');

    var options = {
      keepHistory: 1000 * 60 * 5,
      localSearch: true
    };
    var fields = ['title', 'description'];

    VideosSearch = new SearchSource('videos', fields, options);
  }
});
