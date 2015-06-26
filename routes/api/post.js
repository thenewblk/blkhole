var Post = require('../../models/post');

module.exports = function(app) {
	// Add New text
	app.post('/api/post/new', function(req, res) {
		var content = req.body.content;
		var tags = req.body.tags;
		var client = req.body.client;
		var channels = req.body.channels;
		var project = req.body.project;
		var approved = req.body.approved;

		Post.create({ content: content, tags: tags, client: client, project: project, channels: channels, approved: approved }, function (err, text) {
		  if (err) return console.log(err);
		  	res.send(text);
		});
	});

	// Display texts
	app.get('/api/post/', function(req, res) {
		Post
			.find({})
			.exec( function (err, texts) {
			  	if (err) return console.log(err);
				res.send(texts);
		});
	});

	// Display text
	app.get('/api/post/:slug', function(req, res) {
		Post
			.findOne({ slug: req.params.slug })
			.exec( function (err, text) {
			  	if (err) return console.log(err);
				res.send(text);
		});
	});

	// Delete text
	app.delete('/api/post/:slug/delete', function(req, res) {
		Post
			.findOne({ slug: req.params.slug })
			.remove( function (err, text) {
			  	if (err) return console.log(err);
				res.send(true);
		});
	});

	// Display Edit text Form
	app.get('/api/post/:id/edit', function(req, res) {
			text
				.findOne({ _id: req.params.id })
				.exec( function (err, text) {
				  	if (err) { console.log(err); }
					res.send(text);
			});
	});

	// Edit text
	app.post('/api/post/:id/edit', function(req, res) {
		tmp_text = {};
		tmp_text.content = req.body.content;
		tmp_text.tags = req.body.tags;
		tmp_text.client = req.body.client;
		tmp_text.channels = req.body.channels;
		tmp_text.project = req.body.project;
		tmp_text.approved = req.body.approved;

		Post
			.findOne({ _id: req.params.id })
			.exec(function (err, text) {
			  	if (err) return console.log(err);

				text.content = tmp_text.content;
				text.tags = tmp_text.tags;
				text.client = tmp_text.client;
				text.channels = tmp_text.channels;
				text.project = tmp_text.project;
				text.approved = tmp_text.approved;

				text.save(function (err) {
					if (err) return console.log(err);
					res.send(text);
				});
			});
	});
};
