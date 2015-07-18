
Template.newSponsor.events({
  'click .upload': function() {
    console.log('Click upload image')
    // var self = this;
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      // $('#imageUpload').attr("src", Blob.url);
    });
  },
});
