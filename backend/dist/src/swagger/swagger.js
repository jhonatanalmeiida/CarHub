export const swaggerSpec = {
    openapi: "3.0.3",
    info: {
        title: "CarHub Cloud API",
        version: "1.0.0",
        description: "API REST para catalogo automotivo inteligente, autenticacao JWT e gestao administrativa."
    },
    servers: [{ url: "/api" }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            AuthPayload: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" }
                }
            },
            Brand: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    logoUrl: { type: "string" },
                    country: { type: "string" }
                }
            },
            Vehicle: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    trim: { type: "string" },
                    year: { type: "integer" },
                    price: { type: "number" },
                    fuelType: { type: "string" },
                    transmission: { type: "string" },
                    bodyType: { type: "string" },
                    horsepower: { type: "integer" }
                }
            }
        }
    },
    paths: {
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Cadastro de usuario",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AuthPayload" }
                        }
                    }
                },
                responses: {
                    201: { description: "Usuario criado com sucesso" }
                }
            }
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login com JWT",
                responses: {
                    200: { description: "Autenticado com sucesso" }
                }
            }
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Renovar token de acesso",
                responses: {
                    200: { description: "Tokens renovados" }
                }
            }
        },
        "/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Encerrar sessao",
                responses: {
                    204: { description: "Logout realizado" }
                }
            }
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Retorna usuario autenticado",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Perfil atual" }
                }
            }
        },
        "/brands": {
            get: {
                tags: ["Brands"],
                summary: "Listar marcas"
            },
            post: {
                tags: ["Brands"],
                summary: "Criar marca",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Brand" }
                        }
                    }
                }
            }
        },
        "/brands/{id}": {
            get: {
                tags: ["Brands"],
                summary: "Detalhar marca"
            },
            patch: {
                tags: ["Brands"],
                summary: "Atualizar marca",
                security: [{ bearerAuth: [] }]
            },
            delete: {
                tags: ["Brands"],
                summary: "Excluir marca",
                security: [{ bearerAuth: [] }]
            }
        },
        "/models": {
            get: {
                tags: ["Models"],
                summary: "Listar modelos"
            },
            post: {
                tags: ["Models"],
                summary: "Criar modelo",
                security: [{ bearerAuth: [] }]
            }
        },
        "/models/{id}": {
            get: {
                tags: ["Models"],
                summary: "Detalhar modelo"
            },
            patch: {
                tags: ["Models"],
                summary: "Atualizar modelo",
                security: [{ bearerAuth: [] }]
            },
            delete: {
                tags: ["Models"],
                summary: "Excluir modelo",
                security: [{ bearerAuth: [] }]
            }
        },
        "/vehicles": {
            get: {
                tags: ["Vehicles"],
                summary: "Listar veiculos com filtros"
            },
            post: {
                tags: ["Vehicles"],
                summary: "Criar veiculo",
                security: [{ bearerAuth: [] }]
            }
        },
        "/vehicles/{id}": {
            get: {
                tags: ["Vehicles"],
                summary: "Detalhar veiculo"
            },
            patch: {
                tags: ["Vehicles"],
                summary: "Atualizar veiculo",
                security: [{ bearerAuth: [] }]
            },
            delete: {
                tags: ["Vehicles"],
                summary: "Excluir veiculo",
                security: [{ bearerAuth: [] }]
            }
        },
        "/favorites": {
            get: {
                tags: ["Favorites"],
                summary: "Listar favoritos do usuario",
                security: [{ bearerAuth: [] }]
            }
        },
        "/favorites/{vehicleId}": {
            post: {
                tags: ["Favorites"],
                summary: "Adicionar favorito",
                security: [{ bearerAuth: [] }]
            },
            delete: {
                tags: ["Favorites"],
                summary: "Remover favorito",
                security: [{ bearerAuth: [] }]
            }
        },
        "/comparisons": {
            get: {
                tags: ["Comparisons"],
                summary: "Listar comparacoes",
                security: [{ bearerAuth: [] }]
            },
            post: {
                tags: ["Comparisons"],
                summary: "Criar comparacao",
                security: [{ bearerAuth: [] }]
            }
        },
        "/comparisons/{id}": {
            get: {
                tags: ["Comparisons"],
                summary: "Detalhar comparacao",
                security: [{ bearerAuth: [] }]
            },
            delete: {
                tags: ["Comparisons"],
                summary: "Excluir comparacao",
                security: [{ bearerAuth: [] }]
            }
        },
        "/health": {
            get: {
                tags: ["Health"],
                summary: "Health check da plataforma"
            }
        }
    }
};
