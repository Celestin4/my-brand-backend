const httpMocks = require('node-mocks-http');
const { createPortfolio, getPortfolios, getPortfolioById, updatePortfolio, deletePortfolio } = require('../controllers/portfolioControllers');
const Portfolio = require('../models/portfolioModel');

jest.mock('../models/portfolioModel');

describe('Portfolio Controllers', () => {
  // Test for createPortfolio controller
  it('should create a new portfolio', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        title: 'Test Portfolio',
        githubLink: 'https://github.com/testuser/testrepo'
      },
      file: { filename: 'test_image.jpg' }
    });
    const res = httpMocks.createResponse();
    await createPortfolio(req, res);
    expect(res.statusCode).toBe(201);
    expect(Portfolio.prototype.save).toHaveBeenCalled();
  });

  // Test for getPortfolios controller
  it('should get all portfolios', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    await getPortfolios(req, res);
    expect(res.statusCode).toBe(200);
    expect(Portfolio.find).toHaveBeenCalled();
  });

  // Test for getPortfolioById controller
  it('should get a specific portfolio by ID', async () => {
    const req = httpMocks.createRequest({
      params: { id: 'testId' }
    });
    const res = httpMocks.createResponse();
    await getPortfolioById(req, res);
    expect(res.statusCode).toBe(200);
    expect(Portfolio.findById).toHaveBeenCalledWith('testId');
  });

  // Test for updatePortfolio controller
  it('should update a portfolio by ID', async () => {
    const req = httpMocks.createRequest({
      method: 'PUT',
      params: { id: 'testId' },
      body: {
        title: 'Updated Portfolio',
        githubLink: 'https://github.com/testuser/updatedrepo'
      },
      file: { filename: 'updated_image.jpg' }
    });
    const res = httpMocks.createResponse();
    await updatePortfolio(req, res);
    expect(res.statusCode).toBe(200);
    expect(Portfolio.findById).toHaveBeenCalledWith('testId');
  });

  // Test for deletePortfolio controller
  it('should delete a portfolio by ID', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: 'testId' }
    });
    const res = httpMocks.createResponse();
    await deletePortfolio(req, res);
    expect(res.statusCode).toBe(200);
    expect(Portfolio.findById).toHaveBeenCalledWith('testId');
    expect(Portfolio.deleteOne).toHaveBeenCalledWith({ _id: 'testId' });
  });
});
