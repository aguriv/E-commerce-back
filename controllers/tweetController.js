const { mongoose, User, Tweet } = require("../db");

module.exports = {
  following: async (req, res) => {
    await User.findById(req.user.sub, (err, user) => {
      if (err) {
        return err;
      }
      Tweet.find({ author: { $in: user.following } })
        .populate("author", "name lastname username image")
        .sort({ date: -1 })
        .exec((err, tweets) => {
          if (err) {
            return err;
          }
          res.json(tweets);
        });
    });
  },

  saveTweet: async (req, res) => {
    const tweet = new Tweet({
      text: req.body.text,
      author: mongoose.Types.ObjectId(req.user.sub),
    });
    tweet.save();
    await User.findById(req.user.sub, (err, user) => {
      user.tweets.push(tweet);
      user.save();
    });
    res.json("Tweet saved");
  },

  likeTweet: async (req, res) => {
    await Tweet.findById(req.params._id, (err, tweet) => {
      const foundObjId = tweet.likes.find(
        (e) => e.toString() === req.user.sub.toString()
      );
      if (foundObjId === undefined) {
        tweet.likes.push(req.user.sub);
        tweet.save();
      } else {
        Tweet.updateOne(
          { _id: req.params._id },
          { $pull: { likes: req.user.sub } },
          { safe: true, multi: true },
          (err, tweet) => {
            if (err) {
              return err;
            }
          }
        );
      }
    });
    await Tweet.findById(req.params._id, (err, tweet) => {
      res.json(tweet.likes);
    });
  },

  deleteTweet: async (req, res) => {
    await Tweet.findByIdAndRemove(req.params._id, (err, tweet) => {
      if (err) {
        return err;
      }
    });
    res.json("Tweet deleted");
  },
};
