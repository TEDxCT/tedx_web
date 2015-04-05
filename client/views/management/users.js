Template.registerHelper('users',function(){
  var users = Meteor.users.find(); 
  return users;
});

Template.users.events({
  "click .toggle-checked": function () {
    console.log('ticked');
  	// if (this.checked == undefined) {
  	// 	Meteor.users.update(this._id, {$set: {admin: true}});
  	// 	console.log('checked: ' + this.checked);
  	// 	return;

  	// } 
  	// 	 Meteor.users.update(this._id, {$set: {checked: !this.checked}});
  },
});