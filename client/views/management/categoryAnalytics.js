categoryAnalyticsData = new Object;

Template.categoryAnalytics.rendered = function() {
  Meteor.call('categoryAnalyticsData', ["space_travel"], function (error, result) {
    if(error) console.dir(error);
    if(result) {
      // categoryAnalyticsData = result;
    };

  } );
}

Template.categoryAnalytics.helpers({
  'subjectCols': function() {
    Meteor.call('categoryAnalyticsData', ["space_travel"], function (error, result) {
      if(error) console.dir(error);
      if(result) {
        categoryAnalyticsData = result;
        var subjectCounts = [];
        for(var j = 0; j<subjects.length; j++) {
          subjectCounts[j] = categoryAnalyticsData.planetary[j].count;
        }
        console.log(subjectCounts);
        return subjectCounts;
      };
    } );

  }
})
