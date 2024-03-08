// blogDocs.js

const blogDocs = {
  components: {
    schemas: {
      BlogPost: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          headlineText: {
            type: "string",
          },
          author: {
            type: "string",
          },
          content: {
            type: "string",
          },
          imageUrl: {
            type: "string",
          },
          createdAt: {
            type: "Date",
          },
          likes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          shares: {
            type: "array",
            items: {
              type: "string",
            },
          },
          views: {
            type: "array",
            items: {
              type: "string",
            },
          },
          comments: {
            type: "array",
            items: {
              type: "object",
              properties: {
                author: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
              },
            },
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
    "/api/blogs/create": {
      post: {
        summary: "Create a new blog post",
        tags: ["Blogs"],
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
                  headlineText: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                  author: {
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
            description: "Blog post created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BlogPost",
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
    "/api/blogs/{blogPostId}": {
      delete: {
        summary: "Delete a blog post by ID",
        tags: ["Blogs"],
        parameters: [
          {
            in: "path",
            name: "blogPostId",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the blog post to delete",
          },
        ],
        responses: {
          200: {
            description: "Blog post deleted successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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
    "/api/blogs/{blogPostId}": {
      put: {
        summary: "Update a blog post by ID",
        tags: ["Blogs"],
        parameters: [
          {
            in: "path",
            name: "blogPostId",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the blog post to update",
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
                  headlineText: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                  author: {
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
            description: "Blog post updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BlogPost",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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
    "/api/blogs": {
      get: {
        summary: "Get all blog posts",
        tags: ["Blogs"],
        responses: {
          200: {
            description: "A list of blog posts",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/BlogPost",
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
    "/api/blogs/{blogPostId}": {
      get: {
        summary: "Get a single blog post by ID",
        tags: ["Blogs"],
        parameters: [
          {
            in: "path",
            name: "blogPostId",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the blog post to get",
          },
        ],
        responses: {
          200: {
            description: "Blog post found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BlogPost",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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
    "/api/blogs/like": {
      post: {
        summary: "Like a blog post",
        tags: ["Blogs"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: {
                    type: "string",
                  },
                  blogId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Blog post liked/unliked successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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
    "/api/blogs/share": {
      post: {
        summary: "Share a blog post",
        tags: ["Blogs"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  blogId: {
                    type: "string",
                  },
                  userId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Blog post shared successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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
    "/api/blogs/views": {
      post: {
        summary: "Update views for a blog post",
        tags: ["Blogs"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  blogId: {
                    type: "string",
                  },
                  userId: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Views updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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
    "/api/blogs/{postId}/comments": {
      post: {
        summary: "Add a comment to a blog post",
        tags: ["Blogs"],
        parameters: [
          {
            in: "path",
            name: "postId",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the blog post to add a comment to",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  author: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Comment added to blog post",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Blog post not found",
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

module.exports = blogDocs;
