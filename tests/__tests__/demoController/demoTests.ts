 const server = require('../../../src/server') // Link to your server file
 const mongoose = require("mongoose");

const supertest = require('supertest');
const app = server.getServer;

const request = supertest(app);

const baseUrl = 'localhost:5000';


// beforeEach((done) => {
//   // mongoose.connect("mongodb://localhost:27017/SnelMelder",
//   //   { useNewUrlParser: true, useUnifiedTopology: true },
//   //   () => done());
// });

// afterEach((done) => {
//   // mongoose.connection.db.dropDatabase(() => {
//   //   mongoose.connection.close(() => done())
//   // });
// });

if(app){
  it('get root url', async (done) => {
    await supertest(app).get("/")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // // Check data
      // expect(response.body[0]._id).toBe(post.id);
      // expect(response.body[0].title).toBe(post.title);
      // expect(response.body[0].content).toBe(post.content);
    });
  });
}
else{
  console.log("app is null")
}

 
