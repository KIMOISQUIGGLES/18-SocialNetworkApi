const req = require('express/lib/request');
const res = require('express/lib/response');
const {
    User
} = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // GET ONE USER
    getSingleUser(req, res) {
        User.findOne({
                _id: req.params.userId
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'USER ID NOT FOUND'
                }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // CREATE USER 
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.error(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            })
            .then((user) =>
                !user ?
                res.status(404).json({
                    message: 'USER ID NOT FOUND'
                }) :
                res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteUser(req, res){
        User.findOneAndRemove({ _id: req.params.userId})
        .then((user)=>
        !user
        ? res.status(404).json({message: "USER NOT FOUND"})
        : res.json(user)
        )
        .catch ((err)=> res.status(500).json(err));
      },

      createUserFriend(req,res){
        User.findOneAndUpdate(
          {_id:req.params.userId},
          {$addToSet: {friends: req.body} },
          { runValidators: true, new: true }
        )
        .then((user)=>
        !user
        ? res.status(404).json({message: "USER NOT FOUND"})
        : res.json(user)
        )
        .catch((err)=> res.status(500).json(err))
      },

      deleteUserFriend(req, res) {

        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends:req.params.friendsId  } },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: 'USER NOT FOUND' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },
};