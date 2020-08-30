/* eslint-disable */
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const db = require('../models')
// Assertion style
chai.should()
chai.use(chaiHttp)
  // To test the get route of viewing tickets on basis of time
describe('TASK API',()=>{
  beforeEach(async()=>{
    await db.sequelize.sync({force:true})
  })
  describe('/POST user', () => {
    it('it should create new user', (done) => {
      chai.request(app)
        .post('/addUser')
        .send({
          username: 'k8',
          phone_number: 7838567804
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  describe('/POST book',()=>{
    it('should book the tickets',(done)=>{
      chai.request(app)
      .post(('/book'))
      .send({
        timing:"21:00:00",
        username:"kv",
        phone_number:"7838567893"
      })
      .end((err,res)=>{
        res.should.have.status(200)
        res.should.have.property('status')
        done()
      })
    })
  })
  describe('/GET tickets', () => {
    it('it should not GET all the tickets with given timing', (done) => {
      chai.request(app)
        .get('/view_ticket')
        .send({ timing: '130000' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application')
        .end((err, res) => {
          res.should.have.status(500)
          res.body.msg.should.be.eq('No such tickets found')
          done()
        })
    })
  })
  describe('/UPDATE tickets', () => {
    it('it should update ticket timing if present', (done) => {
      chai.request(app)
        .post('/update_ticket')
        .send({ id: 1})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  describe('/DELETE tickets', () => {
    it('it should delete ticket if present', (done) => {
      chai.request(app)
        .delete('/delete_ticket')
        .send({ id: 1})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application')
        .end((err, res) => {
          res.should.have.status(500)
          res.body.error.should.be.eq('An error occured while deleting your ticket')
          done()
        })
    })
  })
  describe('/GET user', () => {
    it('it should get user details', (done) => {
      chai.request(app)
        .get('/view_user')
        .send({ ticketid:1 })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application')
        .end((err, res) => {
          res.should.have.status(403)
          done()
        })
    })
  })
})
   
 