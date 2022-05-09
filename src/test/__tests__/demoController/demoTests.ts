import app from '../../../server';

const supertest = require('supertest');

const request = supertest(app);


class test{
  baseUrl = 'localhost:5000';

  constructor(){
    it('get root url', async (done) => {
      const response = await request(this.baseUrl).get('/');
    
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello SnelMelder');
      done();
    });
  }

  
  
}