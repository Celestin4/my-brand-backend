const messageDocs = {
  components: {
    schemas: {
      Message: {
        type: "object",
        properties: {
          fullName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          message: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
        },
      },
    },
  },
  tags: [
    {
      name: "Messages",
      description: "API endpoints for managing messages",
    },
  ],
  paths: {
    "/messages": {
      get: {
        summary: "Get all messages",
        tags: ["Messages"],
        responses: {
          200: {
            description: "A list of messages",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Message",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};

module.exports = messageDocs;
