// portfolioDocs.js

const portfolioDocs = {
    components: {
      schemas: {
        Portfolio: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            image: {
              type: "string",
            },
            githubLink: {
              type: "string",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
    paths: {
      "/api/portfolios/create": {
        post: {
          summary: "Create a new portfolio",
          tags: ["Portfolios"],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                    },
                    githubLink: {
                      type: "string",
                    },
                    image: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Portfolio created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Portfolio",
                  },
                },
              },
            },
            400: {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/portfolios": {
        get: {
          summary: "Get all portfolios",
          tags: ["Portfolios"],
          responses: {
            200: {
              description: "A list of portfolios",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Portfolio",
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/api/portfolios/{id}": {
        get: {
          summary: "Get a specific portfolio by ID",
          tags: ["Portfolios"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "ID of the portfolio to get",
            },
          ],
          responses: {
            200: {
              description: "Portfolio found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Portfolio",
                  },
                },
              },
            },
            404: {
              description: "Portfolio not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        put: {
          summary: "Update a portfolio by ID",
          tags: ["Portfolios"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "ID of the portfolio to update",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                    },
                    githubLink: {
                      type: "string",
                    },
                    image: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Portfolio updated successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Portfolio",
                  },
                },
              },
            },
            400: {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            404: {
              description: "Portfolio not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete a portfolio by ID",
          tags: ["Portfolios"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "ID of the portfolio to delete",
            },
          ],
          responses: {
            200: {
              description: "Portfolio deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            404: {
              description: "Portfolio not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            500: {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  
  module.exports = portfolioDocs;
  