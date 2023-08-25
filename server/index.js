const express = require('express');
const mongoose = require('mongoose');

// const app = express();
const uri = 'mongodb://127.0.0.1:27017/online-bookstore';
// mongoose.connect('mongodb://127.0.0.1:27017/online-bookstore');

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
});

async function connect() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
}

const User = mongoose.model('users', userSchema);

async function fetchData() {
	try {
		const data = await User.find();
		console.log('Data:', data);
		disconnect();
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

function disconnect() {
	mongoose.disconnect();
	console.log('Disconnected from MongoDB');
}

connect();

fetchData();
