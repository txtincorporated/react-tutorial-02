import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  twid: String,
  active: Boolean,
  author: String,
  avatar: String,
  body: String,
  date: Date,
  screenname: String
});

const Tweet = mongoose.model('Tweet', schema);

// Static method to return tweet data from db
schema.statics.getTweets = function(page, skip, callback) {
  let tweets = [];
  let start = (page * 10) + (skip * 1);

// Query db using skip and limit to chunk pages
  Tweet.find({}, 'twid active author avatar body date screenname', { skip: start, limit: 10 }).sort({ date: 'desc' }).exec((err, docs) => {
    if(!err) {
      tweets = docs;
      tweets.forEach(tweet => {
        tweet.active = true;
      });
    }

    callback(tweets);

  });
};

module.exports = Tweet;
