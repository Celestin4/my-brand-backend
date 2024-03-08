const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

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
        url: "http://localhost:3000",
        description: "Development server",
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
