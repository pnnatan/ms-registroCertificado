var sha256 = require('js-sha256');

module.exports = (app, repository) => {

    app.get('/', async (req, res) => await res.json({ message: 'It\'s working!' })) //apagavel

    app.get('/certificates', async (req, res) => {
		let documentsList = await repository.getAllDocuments();

		if (documentsList.length < 1){
			res.send({ "success": false, "message": "No documents registered!" });
		}else{
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ "success": true, "message": "Documents successfully returned!", "documents": documentsList }));
		}
    })
    
    app.get('/certificatesBD', async (req,res,next) => {
        await repository.getAllDocumentsBD((err, registerCertificate) => {
            if (err) res.json({ "success": false, "message": "Deu algo errado!" });
            res.json({ "success": true, "message": "OK", "registerCertificate": registerCertificate });
        });
    })

    app.get('/certificate/:id', async (req, res, next) => {
        let documentsList = await repository.getAllDocuments();

		if (!documentsList.includes(req.params.id)){
			res.send({ "success": false, "message": "Document "+req.params.id+" does not exist!" });
		}else{
			let document = await repository.returnDocument(req.params.id)
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ "success": true, "message": "Document successfully returned!", "document": document }));
		}
    })

    app.post('/certificate', async (req, res) => {
		const id = req.body.certidao.id
		const privateKey = '6D48CAAFBCC4567AD91183312B14A206798865913D2DB017DA2777E6A808C9DA'
        const date = new Date();
        
        certidao = {
            'name': req.body.certidao.name,
            'id': req.body.certidao.id,
            'municipioNasc': req.body.certidao.municipioNasc,
            'ufNasc': req.body.certidao.ufNasc,
            'sexo': req.body.certidao.sexo,
            'filiacao': req.body.certidao.filiacao,
        }

        /**
         * certidao = {
            'nome': req.body.certidao.nome,
            'data': req.body.certidao.data,
            'hora': req.body.certidao.hora,
            'municipioNasc': req.body.certidao.municipioNasc,
            'ufNasc': req.body.certidao.ufNasc,
            'municipioReg': req.body.certidao.municipioReg,
            'ufReg': req.body.certidao.ufReg,
            'localNasc': req.body.certidao.localNasc,
            'sexo': req.body.certidao.sexo,
            'pai': req.body.certidao.pai,
            'mae': req.body.certidao.mae,
            'avoMascPai': req.body.certidao.avoMascPai,
            'avoFemPai': req.body.certidao.avoFemPai,
            'avoMascMae': req.body.certidao.avoMascMae,
            'avoFemMae': req.body.certidao.avoFemMae,
            'gemeo': req.body.certidao.gemeo,
            'nomeGemeo': req.body.certidao.nomeGemeo,
            'dataRegExtenso': req.body.certidao.dataRegExtenso,
            'declaracaoNascVivo': req.body.certidao.declaracaoNascVivo 
        }
         */

        let documentsList = await repository.getAllDocuments();
        
		if (documentsList.includes(id)) {
			res.send({ "success": false, "message": 'Element with the same ID already registered!'});
		} else {
            await repository.insertRegistroCertidao({'matricula': id, 'certidaoNascimento': certidao, 'data': date}, (err) => {
                if (err) { res.json({ "success": false, "message": 'Error registering document on BD!' }) }
            })


            documentUploud = sha256(JSON.stringify(certidao).toString())

            console.log("documentUploud", documentUploud)

			console.log(id + ' ' + documentUploud + ' ' + privateKey + ' ' + date.toString());
            
            let response = await repository.registerDocument(id, documentUploud, privateKey, date.toString());
            
            if(response){
				res.json({ "success": true, "message": 'Document successfully registered!'})
			}else{
				res.json({ "success": false, "message": 'Error registering document on Blockchain!' })
			}
		}
    })
    
    require('../eureka-helper/eureka-helper').registerWithEureka('registerCertificate-service', 3005);
}
