//**************Imports***************

// import Mongoose from 'mongoose';

var Mongoose = require('mongoose');

Mongoose.Promise = require('bluebird');

const mongo = Mongoose.connect('mongodb://adamgarcia4:Grimmick15@ds049476.mlab.com:49476/graphql-backend', (err) => {
    if(err) {
        console.error('Could not connect to MongoDB on port _____');
    } else {
        console.log('woo');
    }
});

const ViewSchema = Mongoose.Schema({
    postID: Number,
    views: Number,
})

const View = Mongoose.model('views', ViewSchema);

var newView = new View( { postID: 1, views: 0 });
newView.save(function (err) {
    console.error(err);
})