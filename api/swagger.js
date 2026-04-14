const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Get a Pet API',
            version: '1.0.0',
            description: 'API para adoção de pets — Projeto acadêmico'
        },
        servers: [
            {
                url: 'http://localhost:4040',
                description: 'Servidor local'
            },
            {
                url: 'http://sj.ddns.net:4040',
                description: 'Servidor de produção'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {

                // ─── USER ───────────────────────────────────────────────
                User: {
                    type: 'object',
                    properties: {
                        id:    { type: 'integer', example: 1 },
                        name:  { type: 'string',  example: 'João Silva' },
                        email: { type: 'string',  example: 'joao@email.com' },
                        phone: { type: 'string',  example: '11999999999' },
                        image: { type: 'string',  example: 'perfil.jpg', nullable: true }
                    }
                },
                RegisterRequest: {
                    type: 'object',
                    required: ['name', 'email', 'password', 'confirmpassword', 'phone'],
                    properties: {
                        name:            { type: 'string', example: 'João Silva' },
                        email:           { type: 'string', example: 'joao@email.com' },
                        password:        { type: 'string', example: '123456' },
                        confirmpassword: { type: 'string', example: '123456' },
                        phone:           { type: 'string', example: '11999999999' }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email:    { type: 'string', example: 'joao@email.com' },
                        password: { type: 'string', example: '123456' }
                    }
                },
                UpdateUserRequest: {
                    type: 'object',
                    properties: {
                        name:            { type: 'string', example: 'João Silva Atualizado' },
                        phone:           { type: 'string', example: '11988888888' },
                        password:        { type: 'string', example: 'novasenha123' },
                        confirmpassword: { type: 'string', example: 'novasenha123' }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string',  example: 'Login realizado com sucesso' },
                        token:   { type: 'string',  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user: {
                            type: 'object',
                            properties: {
                                id:    { type: 'integer', example: 1 },
                                name:  { type: 'string',  example: 'João Silva' },
                                email: { type: 'string',  example: 'joao@email.com' }
                            }
                        }
                    }
                },

                // ─── PET ────────────────────────────────────────────────
                Pet: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer',                          example: 1 },
                        name:      { type: 'string',                           example: 'Rex' },
                        age:       { type: 'integer',                          example: 3 },
                        weight:    { type: 'number',                           example: 12.5 },
                        color:     { type: 'string',                           example: 'Caramelo' },
                        images:    { type: 'array', items: { type: 'string' }, example: ['rex1.jpg', 'rex2.jpg'] },
                        available: { type: 'boolean',                          example: true },
                        createdAt: { type: 'string', format: 'date-time',     example: '2024-01-01T00:00:00.000Z' },
                        updatedAt: { type: 'string', format: 'date-time',     example: '2024-01-01T00:00:00.000Z' }
                    }
                },
                CreatePetRequest: {
                    type: 'object',
                    required: ['name', 'age', 'weight', 'color'],
                    properties: {
                        name:   { type: 'string',  example: 'Rex' },
                        age:    { type: 'integer', example: 3 },
                        weight: { type: 'number',  example: 12.5 },
                        color:  { type: 'string',  example: 'Caramelo' }
                    }
                },
                UpdatePetRequest: {
                    type: 'object',
                    properties: {
                        name:   { type: 'string',  example: 'Rex Atualizado' },
                        age:    { type: 'integer', example: 4 },
                        weight: { type: 'number',  example: 13.0 },
                        color:  { type: 'string',  example: 'Preto' }
                    }
                },

                // ─── GENÉRICO ───────────────────────────────────────────
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Mensagem de erro' }
                    }
                },
                SuccessMessage: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Operação realizada com sucesso' }
                    }
                }
            }
        },
        paths: {

            // ════════════════════════════════════════════════════════════
            // STATUS
            // ════════════════════════════════════════════════════════════
            '/': {
                get: {
                    tags: ['Status'],
                    summary: 'Verifica se a API está online',
                    responses: {
                        200: {
                            description: 'API online',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status:  { type: 'string', example: 'API ONLINE 🚀' },
                                            message: { type: 'string', example: 'Projeto acadêmico funcionando' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            // ════════════════════════════════════════════════════════════
            // USUÁRIOS
            // ════════════════════════════════════════════════════════════
            '/users/register': {
                post: {
                    tags: ['Usuários'],
                    summary: 'Cadastrar novo usuário',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/RegisterRequest' }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Usuário criado — retorna token JWT',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
                        },
                        422: {
                            description: 'Dados inválidos ou usuário já existe',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        500: {
                            description: 'Erro interno',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            '/users/login': {
                post: {
                    tags: ['Usuários'],
                    summary: 'Login do usuário',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/LoginRequest' }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Login realizado — retorna token JWT',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } }
                        },
                        401: {
                            description: 'Senha inválida',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        404: {
                            description: 'Usuário não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        422: {
                            description: 'Campos obrigatórios não preenchidos',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        500: {
                            description: 'Erro interno',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            '/users/{id}': {
                get: {
                    tags: ['Usuários'],
                    summary: 'Buscar perfil de um usuário',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Dados do usuário',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        404: {
                            description: 'Usuário não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                },
                patch: {
                    tags: ['Usuários'],
                    summary: 'Editar dados do usuário',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UpdateUserRequest' }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Usuário atualizado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        422: {
                            description: 'Dados inválidos',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            '/users/{id}/image': {
                post: {
                    tags: ['Usuários'],
                    summary: 'Upload de foto de perfil',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        image: { type: 'string', format: 'binary' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Imagem enviada com sucesso',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            // ════════════════════════════════════════════════════════════
            // PETS
            // ════════════════════════════════════════════════════════════
            '/pets': {
                get: {
                    tags: ['Pets'],
                    summary: 'Listar todos os pets disponíveis',
                    responses: {
                        200: {
                            description: 'Lista de pets',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Pet' }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Pets'],
                    summary: 'Cadastrar novo pet',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/CreatePetRequest' }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Pet cadastrado com sucesso',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        422: {
                            description: 'Dados inválidos',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            '/pets/{id}': {
                get: {
                    tags: ['Pets'],
                    summary: 'Buscar detalhes de um pet',
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Dados do pet',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } }
                        },
                        404: {
                            description: 'Pet não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                },
                patch: {
                    tags: ['Pets'],
                    summary: 'Editar dados do pet',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/UpdatePetRequest' }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Pet atualizado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        404: {
                            description: 'Pet não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                },
                delete: {
                    tags: ['Pets'],
                    summary: 'Remover pet',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Pet removido',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        404: {
                            description: 'Pet não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            '/pets/{id}/adopt': {
                patch: {
                    tags: ['Pets'],
                    summary: 'Marcar pet como adotado',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Pet marcado como adotado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        404: {
                            description: 'Pet não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            },

            '/pets/{id}/images': {
                post: {
                    tags: ['Pets'],
                    summary: 'Upload de imagens do pet',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: { type: 'integer', example: 1 }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        images: {
                                            type: 'array',
                                            items: { type: 'string', format: 'binary' }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Imagens enviadas com sucesso',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessMessage' } } }
                        },
                        401: {
                            description: 'Token inválido ou ausente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        },
                        404: {
                            description: 'Pet não encontrado',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
                        }
                    }
                }
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;