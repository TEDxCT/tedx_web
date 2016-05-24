Template.allSponsors.helpers({
  'headlineSponsors': function() {
    var s = sponsors.find({$and: [{"isHeadlineSponsor" : true}, {"published" :  {$not: false}}]});
    return s;
  },
  'sponsors': function() {
    var s = sponsors.find({$and: [{"isHeadlineSponsor" :  {$not: true}}, {"published" :  {$not: false}}]}, {sort: {"priority" : 1}});
    return s;
  },
  'draftSponsors': function() {
    var s = sponsors.find({"published" :  false});
    return s;
  },
  'previousSponsors': function() {
    var s = sponsors.find({"years" : { $nin: ["2015"]}});
    return s;
  },
})
