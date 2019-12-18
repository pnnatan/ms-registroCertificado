const test = require('tape');
const supertest = require('supertest');
const registroCertidao = require('./registroCertidao');
const server = require("../server/server");
const repository = require("../repository/repository");


function runTests() {
    var app = null;
    server.start(registroCertidao, repository, (err,app) => {
        var id = null;
        test('GET /registroCertidao', (t) => {
            supertest(app)
            .get('/registroCertidao')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(res.body && res.body.registroCertidao.length > 0) id = res.body.registroCertidao[0]._id;
                t.error(err, 'No errors')
                t.assert(res.body && res.body.registroCertidao.length > 0, "All Clients returned!")
                t.end()
            })
        })

        test('GET /registroCertidao/:id', (t) => {

            if(!id) {
                t.assert(false, "registroCertidao by Id Returned");
                t.end();
                return;
            }
 
            supertest(app)
                .get('/registroCertidao/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "registroCertidao By Id returned")
                    t.end()  
                })
        })

        test('DELETE /registroCertidao/:id', (t) => {

            if(!id) {
                t.assert(false, "Client deleted By Id");
                t.end();
                return;
            }
 
            supertest(app)
                .delete('/registroCertidao/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Client deleted By Id")
                    t.end()  
                })
        })

        test('PUT /registroCertidao/:id', (t) => {

            if(!id) {
                t.assert(false, "Client updated By Id");
                t.end();
                return;
            }
 
            supertest(app)
                .put('/registroCertidao/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>{
                    t.error(err, 'No errors')
                    t.assert(res.body, "Client updated By Id")
                    t.end()  
                    process.exit(0);
                })
        })



    })
}

module.exports = {runTests}