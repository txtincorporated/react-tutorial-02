import Tweet from '../models/Tweet';

export default (stream, io) => {
  stream.on('data', data => {
    // new tweet object populated from stream data
    const tweet = {
      twid: data['id'],
      active: false,
      author: data['user']['name'],
      avatar: data['user']['profile_image_url'],
      body: data['text'],
      date: data['created_at'],
      screenname: data['user']['screen_name']
    };

    // New model instance created with it
    const tweetEntry = new Tweet(tweet);

    // Instance saved to db
    tweetEntry.save(err => {
      if(!err) {
        io.emit('tweet', tweet);

      }
    });
  });
};
