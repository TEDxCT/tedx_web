Meteor.startup(function() {
    var client = AlgoliaSearch("ZBQG58E3FM", "5014cb2c16dc89058e0b3e560d14c5a1");

    var index = client.initIndex("talks");

    // array contains the data you want to save in the index
    var videosIndex = videos.find({}).fetch();

    videosIndex.forEach(function(doc, index) {
        doc.objectID = doc._id;
        videosIndex[index] = doc;
    });

    index.saveObjects(videosIndex, function (error, content) {
    if (error) console.error('Error:', error);
    else console.log('Content:', content);
    });
});