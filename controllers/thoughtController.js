const {
    Thought,
    User, 
    Reactions,
} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // GET A SINGLE COMMENT 
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'THOUGHT ID NOT FOUND'
                }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // CREATE THOUGHT
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $push: {
                        thoughts: thought._id
                    }
                }, {
                    new: true
                });
            })
            .then((user) =>
                !user ?
                res
                .status(404)
                .json({
                    message: 'THOUGHT CREATED'
                }) :
                res.json({
                    message: 'THOUGHT CREATED'
                })
            )
            .catch((err) => {
                console.error(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'THOUGHT ID NOT FOUND'
                }) :
                res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({
                _id: req.params.thoughtId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'THOUGHT ID NOT FOUND'
                }) :
                User.findOneAndUpdate({
                    thoughts: req.params.thoughtId
                }, {
                    $pull: {
                        thoughts: req.params.thoughtId
                    }
                }, {
                    new: true
                })
            )
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'THOUGHT EXISTS, USER ID NOT FOUND',
                }) :
                res.json({
                    message: 'BEGONE, THOUGHT'
                })
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: 'REACTION ID NOT FOUND'
                }) :
                res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    deleteReaction(req, res) {

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactions: req.params.reactionsId } } },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'REACTION ID NOT FOUND' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },
        
        
};