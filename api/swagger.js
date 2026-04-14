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
                Pet: {
                    type: 'object',
                    properties: {
                        id:        { type: 'integer',        example: 1 },
                        name:      { type: 'string',         example: 'Rex' },
                        age:       { type: 'integer',        example: 3 },
                        weight:    { type: 'number',         example: 12.5 },
                        color:     { type: 'string',         example: 'Caramelo' },
                        images:    { type: 'array', items: { type: 'string' }, example: ['rex1.jpg'] },
                        available: { type: 'boolean',        example: true }
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
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Mensagem de erro' }
                    }
                }
            }
        },
        paths: {
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
                            description: 'Usuário criado com sucesso',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/AuthResponse' }
                                }
                            }
                        },
                        422: {
                            description: 'Dados inválidos',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' }
                                }
                            }
                        },
                        500: {
                            description: 'Erro interno no servidor',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' }
                                }
                            }
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
                            description: 'Login realizado com sucesso',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/AuthResponse' }
                                }
                            }
                        },
                        401: {
                            description: 'Senha inválida',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' }
                                }
                            }
                        },
                        404: {
                            description: 'Usuário não encontrado',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' }
                                }
                            }
                        },
                        422: {
                            description: 'Campos obrigatórios não preenchidos',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' }
                                }
                            }
                        },
                        500: {
                            description: 'Erro interno no servidor',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/ErrorResponse' }
                                }
                            }
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