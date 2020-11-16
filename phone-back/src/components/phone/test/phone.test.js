const mockingoose = require('mockingoose').default;
// const supertest = require('supertest');
const httpMocks = require('./async-http.mock');
const model = require('../phone.model');
const controller = require('../phone.controller');
const router = require('../phone.routes');

const dataToSave = {
  name: 'iPhone 7',
  manufacturer: 'Apple',
  description: 'iPhone 7',
  color: 'White',
  price: 700,
  imageFileName: 'iPhone_7.png',
  screen: '4,7 inch IPS',
  processor: 'A10 Fusion',
  ram: 2,
};

const mockFind = [
  {
    _id: '5fb260bf62215fc88be82f93',
    name: 'iPhone 7',
    manufacturer: 'Apple',
    description: 'iPhone 7',
    color: 'White',
    price: 700,
    imageFileName: 'iPhone_7.png',
    screen: '4,7 inch IPS',
    processor: 'A10 Fusion',
    ram: 2,
  },
  {
    _id: '5fb2611762215fc88be82f94',
    name: 'iPhone 8',
    manufacturer: 'Apple',
    description: 'iPhone 8',
    color: 'White',
    price: 700,
    imageFileName: 'iPhone_8.png',
    screen: '4,7 inch IPS',
    processor: 'A11 Fusion',
    ram: 2,
  },
];

describe('Phone unit testing ', () => {
  describe('Model unit test', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('Model should save on DB an item', async (done) => {
      model
        .add(dataToSave)
        .then((res) => {
          expect(res.name).not.toBeNull();
          done();
        });
    });

    it('Model should throw an error', async (done) => {
      mockingoose.phones.toReturn(new Error('error'), 'save');
      model
        .add(dataToSave)
        .catch((err) => {
          expect(err.message).toBe('error');
          done();
        });
    });

    it('Model should return selected phone', async (done) => {
      const id = '5fb260bf62215fc88be82f93';
      const findOne = mockFind[0];
      mockingoose('phones').toReturn(findOne, 'findOne');

      model
        .getById(id)
        .then((phone) => {
          expect(phone).toBeDefined();
          expect(phone.name).toBe('iPhone 7');
          done();
        });
    });

    it('Model should return all saved phones', async (done) => {
      mockingoose('phones').toReturn(mockFind, 'find');

      model
        .getList()
        .then((phoneList) => {
          expect(phoneList).toBeDefined();
          expect(phoneList.length).toBe(2);
          done();
        });
    });
  });

  describe('Controller unit test', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });

    it('Phone controller should save an item', async (done) => {
      controller.savePhone(dataToSave)
        .then((res) => {
          expect(res._id).not.toBeNull();
          expect(res.name).toBe(dataToSave.name);
          done();
        });
    });

    it('Phone controller should find selected phone', async (done) => {
      const id = '5fb260bf62215fc88be82f93';
      const findOne = mockFind[0];
      mockingoose('phones').toReturn(findOne, 'findOne');

      controller
        .getPhones(id)
        .then((phone) => {
          expect(phone).toBeDefined();
          expect(phone.name).toBe('iPhone 7');
          done();
        });
    });

    it('Phone controller should find all phones', async (done) => {
      mockingoose('phones').toReturn(mockFind, 'find');

      controller.getPhones()
        .then((phoneList) => {
          expect(phoneList).toBeDefined();
          expect(phoneList.length).toBe(2);
          done();
        });
    });
  });
});

describe('API Tests', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should save a phone', async (done) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/',
      body:
        {
          name: 'iPhone 7',
          manufacturer: 'Apple',
          description: 'iPhone 7',
          color: 'White',
          price: 700,
          imageFileName: 'iPhone_7.png',
          screen: '4,7 inch IPS',
          processor: 'A10 Fusion',
          ram: 2,
          timestamp: '2020-11-16T11:21:35.778Z',
        },
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(response.statusCode).toBe(201);
      expect(body.id).toBeDefined();
      done();
    });
  });

  it('should fail', async (done) => {
    const errorMsg = 'ERROR!!';
    mockingoose('phones').toReturn(new Error(errorMsg), 'save');

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/',
      body: {
        name: 'iPhone 7',
        manufacturer: 'Apple',
        description: 'iPhone 7',
      },
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(body.error).toBe(errorMsg);
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it('should return No content on empty body', async (done) => {
    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/',
      body: {},
    });

    const response = httpMocks.createResponse();

    router(request, response);

    expect(response.statusCode).toBe(204);

    response.on('end', () => {
      expect(response.statusCode).toBe(204);
      done();
    });
  });

  it('should return all saved phones', async (done) => {
    mockingoose('phones').toReturn(mockFind, 'find');

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(response.statusCode).toBe(200);
      expect(body).toBeDefined();
      expect(body.length).toBe(2);
      done();
    });
  });

  it('should return error on all saved phones', async (done) => {
    const errorMsg = 'ERROR!!';
    mockingoose('phones').toReturn(new Error(errorMsg), 'find');

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(body.error).toBe(errorMsg);
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it('should return selected phone', async (done) => {
    const id = '5fb260bf62215fc88be82f93';
    const findOne = mockFind[0];
    mockingoose('phones').toReturn(findOne, 'findOne');

    const request = httpMocks.createRequest({
      method: 'GET',
      url: `/${id}`,
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(response.statusCode).toBe(200);
      expect(body).toBeDefined();
      done();
    });
  });

  it('should return error on selected phone', async (done) => {
    const errorMsg = 'ERROR!!';
    mockingoose('phones').toReturn(new Error(errorMsg), 'findOne');
    const id = '5fb260bf62215fc88be82f93';

    const request = httpMocks.createRequest({
      method: 'GET',
      url: `/${id}`,
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(body.error).toBe(errorMsg);
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it('should update selected phone', async (done) => {
    mockingoose('phones').toReturn(mockFind, 'findOneAndUpdate');
    const id = '5fb260bf62215fc88be82f93';

    const request = httpMocks.createRequest({
      method: 'PUT',
      url: `/${id}`,
      body: {
        name: 'iPhone 7-changed',
      }
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(response.statusCode).toBe(200);
      expect(body).toBeDefined()
      done();
    });
  });
  it('should return error on selected phone', async (done) => {
    const errorMsg = 'ERROR!!';
    mockingoose('phones').toReturn(new Error(errorMsg), 'findOneAndUpdate');
    const id = '5fb260bf62215fc88be82f93';

    const request = httpMocks.createRequest({
      method: 'PUT',
      url: `/${id}`,
      body: {
        name: 'iPhone 7-changed',
      }
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(body.error).toBe(errorMsg);
      expect(response.statusCode).toBe(500);
      done();
    });
  });

  it('should delete selected phone', async (done) => {
    const id = '5fb260bf62215fc88be82f93';
    mockingoose('phones').toReturn({ _id: id }, 'findOneAndDelete');

    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: `/${id}`,
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(response.statusCode).toBe(200);
      expect(body).toBeDefined()
      done();
    });
  });
  it('should return error on delete phone', async (done) => {
    const errorMsg = 'ERROR!!';
    mockingoose('phones').toReturn(new Error(errorMsg), 'findOneAndDelete');
    const id = '5fb260bf62215fc88be82f93';

    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: `/${id}`,
    });

    const response = httpMocks.createResponse();

    router(request, response);

    response.on('end', (body) => {
      expect(body.error).toBe(errorMsg);
      expect(response.statusCode).toBe(500);
      done();
    });
  });
});
