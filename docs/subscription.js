// subscriptionDocs.js

const subscriptionDocs = {
    components: {
      schemas: {
        Subscription: {
          type: "object",
          properties: {
            email: {
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
      "/api/subscribe": {
        post: {
          summary: "Subscribe to newsletter",
          tags: ["Subscription"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Subscription",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Subscription successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: {
                        type: "string",
                      },
                    },
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
  
  module.exports = subscriptionDocs;
  