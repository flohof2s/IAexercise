const swaggerJsdoc = require("swagger-jsdoc");
const SocialPerformanceRecord = require("./models/SocialPerformanceRecord");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SalesMan API",
      version: "1.0.0",
      description: "Dokumentation der SalesMan-API"
    },
    servers: [
      { url: "http://localhost:3000/api ", description: "Lokale Entwicklung" }
    ],
    components: {
      schemas: {
        SalesMan: {
          type: "object",
          required: ["id", "name", "salary", "birthday", "email"],
          properties: {
            id: { type: "integer", example: 101 },
            name: { type: "string", example: "Max Mustermann" },
            salary: { type: "number", example: 42000 },
            birthday: { type: "string", format: "date", example: "1995-07-12" },
            email: { type: "string", format: "email", example: "max@example.com" },
            phone: { type: "string", example: "+49-160-1234567" }
          }
        },
        SalesManUpdate: {
          type: "object",
          properties: {
            name: { type: "string", example: "Max Mustermann" },
            salary: { type: "number", example: 42000 },
            birthday: { type: "string", format: "date", example: "1995-07-12" },
            email: { type: "string", format: "email", example: "max@example.com" },
            phone: { type: "string", example: "+49-160-1234567" }
          }
        },
        SocialPerformanceRecord: {
          type: "object",
          required: ["id", "year","score","salesManId"],
          properties: {
            id: { type: "integer", example: 101 },
            year: { type: "integer", example: 2024 },
            score: { type: "number", example: 7.5 },
            salesManId: { type: "integer", example: 5 },
          }
        },
        SocialPerformanceRecordUpdate: {
          type: "object",
          required: ["year","score","salesManId"],
          properties: {
            year: { type: "integer", example: 2024 },
            score: { type: "number", example: 7.5 },
            salesManId: { type: "integer", example: 5 },
          },
          description: "Felder, die beim Update geändert werden dürfen"
        },
        Error: {
          type: "object",
          properties: { message: { type: "string" } }
        },
        DeleteResult: {
            type: "object",
            properties: {
            acknowledged: { type: "boolean", example: true },
            deletedCount: { type: "integer", example: 1 }
            },
            description: "Ergebnis der Löschoperation (Mongoose deleteMany)"
        }
      }
    },
    paths: {
        "/salesmen": {
            get: {
                summary: "Alle SalesMen auflisten",
                description: "Gibt eine Liste aller SalesMen zurück.",
                tags: ["SalesMen"],
                responses: {
                "200": {
                    description: "Liste",
                    content: {
                    "application/json": {
                        schema: { type: "array", items: { $ref: "#/components/schemas/SalesMan" } }
                    }
                    }
                },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            },
            post: {
                summary: "Neuen SalesMan anlegen",
                description: "Erstellt einen neuen SalesMan und löst ein RxJS-Event aus.",
                tags: ["SalesMen"],
                requestBody: {
                required: true,
                content: { "application/json": { schema: { $ref: "#/components/schemas/SalesMan" } } }
                },
                responses: {
                "200": {
                    description: "Erfolgreich erstellt",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/SalesMan" } } }
                },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            },
            delete: {
                summary: "Alle SalesMen und SocialPerformanceRecords löschen",
                description: "Löscht alle Einträge aus den Collections SalesMan und SocialPerformanceRecord.",
                tags: ["SalesMen"],
                responses: {
                "200": { description: "Alle Einträge gelöscht" },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            }
        },

        "/salesmen/{id}": {
            get: {
                summary: "SalesMan nach id abrufen",
                description: "Gibt den SalesMan mit der angegebenen ID zurück.",
                tags: ["SalesMen"],
                parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    description: "Eindeutige SalesMan-ID (nicht MongoDB _id)"
                }
                ],
                responses: {
                "200": {
                    description: "Gefunden",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/SalesMan" } } }
                },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            },
            put: {
                summary: "SalesMan per id aktualisieren",
                tags: ["SalesMen"],
                parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    description: "Eindeutige SalesMan-ID (nicht MongoDB _id)"
                }
                ],
                requestBody: {
                required: true,
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/SalesManUpdate" } }
                }
                },
                responses: {
                "200": {
                    description: "Aktualisiert",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/SalesMan" } } }
                },
                "404": {
                    description: "Nicht gefunden",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            },
            delete: {
                summary: "SalesMan nach id löschen",
                description: "Löscht einen SalesMan anhand seiner ID.",
                tags: ["SalesMen"],
                parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    description: "Eindeutige SalesMan-ID (nicht MongoDB _id)"
                }
                ],
                responses: {
                "200": {
                    description: "Gelöscht",
                    content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/DeleteResult" }
                    }
                    }
                },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            }
        },

        "/salesmen/{id}/bonussalary": {
            get: {
                summary: "Bonusgehalt eines SalesMan abrufen",
                description: "Berechnet und gibt das Bonusgehalt des angegebenen SalesMan zurück.",
                tags: ["SalesMen"],
                parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "integer" },
                    description: "Eindeutige SalesMan-ID"
                }
                ],
                responses: {
                "200": {
                    description: "Erfolgreich berechnet",
                    content: { "application/json": { schema: { type: "number", example: 500.0 } } }
                },
                "500": {
                    description: "Serverfehler",
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
                }
            }
        },
        "/spr": {
            get: {
            summary: "Alle SocialPerformanceRecords auflisten",
            description: "Gibt eine Liste aller SocialPerformanceRecords zurück.",
            tags: ["SocialPerformanceRecord"],
            responses: {
                "200": {
                description: "Liste",
                content: {
                    "application/json": {
                    schema: {
                        type: "array",
                        items: { $ref: "#/components/schemas/SocialPerformanceRecord" }
                    }
                    }
                }
                },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            },
            post: {
            summary: "Neuen SocialPerformanceRecord anlegen",
            tags: ["SocialPerformanceRecord"],
            requestBody: {
                required: true,
                content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/SocialPerformanceRecord" }
                }
                }
            },
            responses: {
                "200": {
                description: "Erfolgreich erstellt",
                content: {
                    "application/json": {
                    schema: { $ref: "#/components/schemas/SocialPerformanceRecord" }
                    }
                }
                },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            },
            delete: {
            summary: "Alle SocialPerformanceRecords löschen",
            tags: ["SocialPerformanceRecord"],
            responses: {
                "200": { description: "Alle Einträge gelöscht" },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            }
        },

        "/spr/{id}": {
            get: {
            summary: "SocialPerformanceRecord nach id abrufen",
            tags: ["SocialPerformanceRecord"],
            parameters: [
                {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "Eindeutige SocialPerformanceRecord-ID (nicht MongoDB _id)"
                }
            ],
            responses: {
                "200": {
                description: "Gefunden",
                content: {
                    "application/json": {
                    schema: { $ref: "#/components/schemas/SocialPerformanceRecord" }
                    }
                }
                },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            },
            put: {
            summary: "SocialPerformanceRecord per id aktualisieren",
            tags: ["SocialPerformanceRecord"],
            parameters: [
                {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "Eindeutige SocialPerformanceRecord-ID (nicht MongoDB _id)"
                }
            ],
            requestBody: {
                required: true,
                content: {
                "application/json": { schema: { $ref: "#/components/schemas/SocialPerformanceRecordUpdate" } }
                }
            },
            responses: {
                "200": {
                description: "Aktualisiert",
                content: {
                    "application/json": {
                    schema: { $ref: "#/components/schemas/SocialPerformanceRecord" }
                    }
                }
                },
                "404": {
                description: "Nicht gefunden",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            },
            delete: {
            summary: "SocialPerformanceRecord nach id löschen",
            tags: ["SocialPerformanceRecord"],
            parameters: [
                {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "Eindeutige SocialPerformanceRecord-ID (nicht MongoDB _id)"
                }
            ],
            responses: {
                "200": {
                description: "Gelöscht",
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/DeleteResult" } }
                }
                },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            }
        },

        "/spr/salesman/{id}": {
            get: {
            summary: "Alle SocialPerformanceRecords eines SalesMan abrufen",
            description: "Gibt alle SocialPerformanceRecords für den angegebenen SalesMan zurück.",
            tags: ["SocialPerformanceRecord"],
            parameters: [
                {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "SalesMan-ID, zu der die Records gehören"
                }
            ],
            responses: {
                "200": {
                description: "Liste",
                content: {
                    "application/json": {
                    schema: {
                        type: "array",
                        items: { $ref: "#/components/schemas/SocialPerformanceRecord" }
                    }
                    }
                }
                },
                "500": {
                description: "Serverfehler",
                content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } }
                }
            }
            }
        }
    }
  },
  apis: ["./routes/**/*.js"]
};

const openapiSpec = swaggerJsdoc(options);
module.exports = openapiSpec;
