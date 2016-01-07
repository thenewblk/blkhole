// config/database.js
module.exports = {

	 'url' :
	 			'mongodb://127.0.0.1/newblk' ||
	 			process.env.MONGOLAB_URI ||
	 			process.env.MONGOHQ_URL
};
