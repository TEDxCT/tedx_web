Handlebars.registerHelper('isEqual', function(string1, string2) {
    return string1 === string2;
});

Handlebars.registerHelper('userIsInRole', function(role){
  return userIsInRole(role);
});

Handlebars.registerHelper('userIsVerified', function(role){
 return userIsVerified();
});

Handlebars.registerHelper('formatId', function(data) {
    return (data && data._str) || data;
});

formattedId = function(data) {
  return (data && data._str) || data;
}

Handlebars.registerHelper('objectsWithIndex', function(objects) {
  // check(objects, Array);
  for(var i = 0; i<objects.length; i++) {
      objects[i].index = i;
  }
  return objects;
});

setHighLevelNav = function(highLevelNavSelection) {
  Session.set("navSelected", highLevelNavSelection);
}
