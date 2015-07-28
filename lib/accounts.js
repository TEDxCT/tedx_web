// Accounts.config({ restrictCreationByEmailDomain: 'tedxcapetown.org', sendVerificationEmail: true });
Meteor.startup(function () {
  if (Meteor.isServer) {
  smtp = {
     username: 'admin@tedxcapetown.org',   // eg: server@gentlenode.com
     password: 'admin!@#',   // eg: 3eeP1gtizk5eziohfervU
     server:   'email2.texo.co.za',  // eg: mail.gandi.net
     port: 465
   }
 var url = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  process.env.MAIL_URL = url


//CREATE ADMIN ROLE
  var user = Meteor.users.findOne({'emails.address' : {$in: ['admin@tedxcapetown.org']}});
  if (!user){
    var id = Accounts.createUser({
       email: 'admin@tedxcapetown.org',
       password: "admin!@#",
       profile: { name: 'Admin'}
     });

     Roles.addUsersToRoles(id,['admin']);

   } else if (!Roles.userIsInRole(user._id, ['admin'])){
      Roles.addUsersToRoles(user._id, ['admin']);
   }
 }
});
