Template.allSponsors.helpers({
  'headlineSponsors': function() {
    var s = sponsors.find({$and: [{"isHeadlineSponsor" : true}, {"years" : { $in: ["2015"]}}]});
    return s;
  },
  'sponsors': function() {
    var s = sponsors.find({$and: [{"isHeadlineSponsor" :  {$not: true}}, {"years" : { $in: ["2015"]}}]}, {sort: {"priority" : 1}});
    return s;
  },
  'previousSponsors': function() {
    var s = sponsors.find({"years" : { $nin: ["2015"]}});
    return s;
  },
})
