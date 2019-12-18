module.exports = (app, repository) => {

	app.get('/', (req, res) => res.json({ message: 'It\'s working!' }))

	app.get('/document/:id', async (req, res) => {
		let documentsList = await repository.getAllDocuments();

		if (!documentsList.includes(req.params.id)){
			res.send({ "success": false, "message": "Document "+req.params.id+" does not exist!" });
		}else{
			let document = await repository.returnDocument(req.params.id)
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ "success": true, "message": "Document successfully returned!", "document": document }));
		}
	})

	app.get('/documents', async (req, res) => {
		let documentsList = await repository.getAllDocuments();

		if (documentsList == null){
			res.send({ "success": false, "message": "No documents registered!" });
		}else{
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ "success": true, "message": "Documents successfully returned!", "documents": documentsList }));
		}
	})

	app.post('/document/', async (req, res) => {
		const id = req.body.id
		const document = req.body.document
		const privateKey = req.body.privateKey
		const date = new Date();

		let documentsList = await repository.getAllDocuments();

		if (documentsList.includes(id)) {
			res.send({ "success": false, "message": 'Element with the same ID already registered!'});
		} else {
			console.log(id + ' ' + document + ' ' + privateKey + ' ' + date.toString());
			let response = await repository.registerDocument(id, document, privateKey, date.toString());
			if(response){
				res.json({ "success": true, "message": 'Document successfully registered!'})
			}else{
				res.json({ "success": false, "message": 'Error registering document!' })
			}
		}
	})
}
