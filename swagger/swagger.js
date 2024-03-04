const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Brand",
      version: "1.0.0",
      description: "This is API documentation for By Brand. This Brand is for demonstrating mys solid foundation  in Fullstack web development",
      contact: {
        name: "NTEZIRYAYO Celestine",
        email: "nteziryayocelestin4@gmail.com"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["../routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
