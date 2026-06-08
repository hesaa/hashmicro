const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Hashmicro Technical Test API",
    version: "1.0.0",
    description:
      "Node.js Express TypeScript MVC - CRUD Products, Statistics, Discount Calculation, String Comparison",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Laptop ASUS" },
          description: { type: "string", example: "Laptop untuk kerja" },
          price: { type: "number", example: 12500000 },
          stock: { type: "integer", example: 50 },
          category: { type: "string", example: "electronics" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      CreateProduct: {
        type: "object",
        required: ["name", "price"],
        properties: {
          name: { type: "string", example: "Laptop ASUS" },
          description: { type: "string", example: "Laptop untuk kerja" },
          price: { type: "number", example: 12500000 },
          stock: { type: "integer", example: 50 },
          category: { type: "string", example: "electronics" },
        },
      },
      UpdateProduct: {
        type: "object",
        properties: {
          name: { type: "string", example: "Laptop ASUS Updated" },
          description: { type: "string" },
          price: { type: "number", example: 13000000 },
          stock: { type: "integer", example: 30 },
          category: { type: "string" },
        },
      },
      ComparisonRequest: {
        type: "object",
        required: ["input1", "input2", "type"],
        properties: {
          input1: { type: "string", example: "ABBCD" },
          input2: { type: "string", example: "Gallant Duck" },
          type: {
            type: "string",
            enum: ["sensitive", "nonsensitive"],
            example: "sensitive",
          },
        },
      },
      ComparisonResult: {
        type: "object",
        properties: {
          input1: { type: "string", example: "ABBCD" },
          input2: { type: "string", example: "Gallant Duck" },
          type: { type: "string", example: "sensitive" },
          totalChars: { type: "integer", example: 5 },
          matchedChars: { type: "integer", example: 1 },
          percentage: { type: "number", example: 20 },
        },
      },
      DiscountRequest: {
        type: "object",
        required: ["price", "stock", "isMember"],
        properties: {
          price: { type: "number", example: 12500000 },
          stock: { type: "integer", example: 60 },
          isMember: { type: "boolean", example: true },
        },
      },
      DiscountResult: {
        type: "object",
        properties: {
          originalPrice: { type: "number", example: 12500000 },
          discount: { type: "number", example: 25 },
          discountedPrice: { type: "number", example: 9375000 },
        },
      },
      ApiResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {},
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Server is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "UP" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/products": {
      get: {
        tags: ["Products"],
        summary: "Get all products",
        parameters: [
          { in: "query", name: "page", schema: { type: "integer", default: 1 }, description: "Page number" },
          { in: "query", name: "limit", schema: { type: "integer", default: 10 }, description: "Items per page" },
          { in: "query", name: "search", schema: { type: "string" }, description: "Search by name" },
        ],
        responses: {
          "200": {
            description: "List of products with pagination",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { type: "array", items: { $ref: "#/components/schemas/Product" } },
                    total: { type: "integer" },
                    page: { type: "integer" },
                    limit: { type: "integer" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create a new product",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateProduct" },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
          "400": { description: "Validation error" },
        },
      },
    },
    "/api/products/stats": {
      get: {
        tags: ["Products"],
        summary: "Get product statistics by category",
        description: "Uses nested loop to aggregate total value and average price per category",
        responses: {
          "200": {
            description: "Product statistics",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      additionalProperties: {
                        type: "object",
                        properties: {
                          count: { type: "integer" },
                          totalValue: { type: "number" },
                          avgPrice: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Get product by ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Product found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
          "404": { description: "Product not found" },
        },
      },
      put: {
        tags: ["Products"],
        summary: "Update a product",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateProduct" },
            },
          },
        },
        responses: {
          "200": {
            description: "Product updated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
          "404": { description: "Product not found" },
        },
      },
      delete: {
        tags: ["Products"],
        summary: "Delete a product",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } },
        ],
        responses: {
          "200": {
            description: "Product deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "404": { description: "Product not found" },
        },
      },
    },
    "/api/products/discount": {
      post: {
        tags: ["Products"],
        summary: "Calculate discount (Nested If + Math)",
        description:
          "Calculates discount based on price tier, stock level, and membership status using nested if logic",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DiscountRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Discount calculated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/DiscountResult" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/comparison": {
      post: {
        tags: ["Comparison"],
        summary: "Compare two strings (sensitive / non-sensitive)",
        description: [
          "Calculates what percentage of unique characters from input1 appear in input2.",
          "- **sensitive**: exact case match (D ≠ d)",
          "- **nonsensitive**: case-insensitive match (D = d)",
          "",
          "Example: input1=ABBCD, input2=Gallant Duck",
          "- sensitive: only D matches → 1/5 = 20%",
          "- nonsensitive: a, c, D match → 3/5 = 60%",
        ].join("\n"),
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ComparisonRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Comparison result with percentage",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    data: { $ref: "#/components/schemas/ComparisonResult" },
                  },
                },
              },
            },
          },
          "400": { description: "Validation error" },
        },
      },
    },
  },
};

export default swaggerSpec;
