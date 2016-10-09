Template.editMember.events({ 
    'click .btn-upload-from-file': function(event, template) {
        event.preventDefault();
    uploadWithFilePicker(template)
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    uploadFromWebURL(template);
  },
    'click .save_member': function(event, template) { 
         let member = {};
         
         member.firstName = $(".firstNameText").val();
         member.lastName = $(".lastNameText").val();
         member.portfolio = $(".portfolioText").val();
         member.bio = $(".bioText").val();
         member.image = $('#imageUpload').attr("src");
         member.startYear = $(".startYearText").val();
         member.endYear = $(".endYearText").val();
         member.published = $('#publishSwitch').is(':checked');

         team.update({"_id":this._id}, {$set: member});    

         Router.go('/team/show/' + this._id);  
    } 
});

Template.editMember.helpers({
  published: function() {
    if(this.published===true) return 'checked';
    else return '';
  }
});