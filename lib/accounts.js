// Accounts.config({ restrictCreationByEmailDomain: 'tedxcapetown.org', sendVerificationEmail: true });
Meteor.startup(function () {
  // if (Meteor.isServer) {
    console.log("set up mail server");
  smtp = {
     username: 'admin@tedxcapetown.org',   // eg: server@gentlenode.com
     password: 'admin!@#',   // eg: 3eeP1gtizk5eziohfervU
     server:   'email2.texo.co.za',  // eg: mail.gandi.net
     port: 465
   }
   console.log(smtp);
 var url = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
 console.log(url);

  process.env.MAIL_URL = url
 // }
});
