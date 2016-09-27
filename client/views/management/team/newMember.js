Template.newMember.events({ 
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
         member.published = $('input.publishSwitch').is(':checked');

         let newId = team.insert(member);    

         Router.go('/team/show/' + newId);  
    } 
});