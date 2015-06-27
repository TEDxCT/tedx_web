Template.news.helpers({
  'mostRecent': function() {
    return posts.findOne({});
  },
  'latest': function() {
    return posts.find({}, {sort: {count:-1}, limit:10});
  },
  'interesting': function() {
    return posts.find({"pinned": true});
  },
})
