const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://luongtopp:luong27112017luong@jobhubdb.9t42rwx.mongodb.net/jobhubdb');
        console.log("Connect successfully!");
    } catch (e) {
        console.log("Connect failure!");
    }

}

module.exports = { connect }