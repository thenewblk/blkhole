// config/database.js
module.exports = {

	 'url' :
	 			process.env.MONGOLAB_URI ||
	 			process.env.MONGOHQ_URL ||
				'mongodb://127.0.0.1/newblk' 
};
