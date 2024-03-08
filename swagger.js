const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const isProduction = process.env.NODE_ENV === 'production';

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "MY BRAND - NTEZIRYAYO CELESTIN",
      version: "1.0.0",
      description: "API documentation for MY BRAND",
    },
    servers: [
      {
        url: isProduction ? "https://my-brand-backend-8mqk.onrender.com" : "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: [path.resolve(__dirname, "./routes/*.js")],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
