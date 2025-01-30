import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path'; 
import { uRI } from './config';
import router from '../src/routes/userRoutes'; 
import swaggerJSDoc from 'swagger-jsdoc';


// Configuración de Swagger
const swaggerUi = require('swagger-ui-express');
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'API de Usuarios', // Título de la API
      version: '1.0.0', // Versión de la API
      description: 'Documentación de la API de usuarios', // Descripción
    },
    servers: [
      {
        url: 'http://localhost:9000/api', // URL base de la API
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        User: { // Define el esquema "User"
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Juan Pérez',
            },
            email: {
              type: 'string',
              example: 'juan@example.com',
            },
            age: {
              type: 'number',
              example: 30,
            },
          },
          required: ['name', 'email', 'age'], // Campos obligatorios
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Ruta a los archivos que contienen las rutas
};


// Configuración de la aplicación
const app = express();
const port = 9000;

// Middlewares
app.use(express.json());
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc()));

// Rutas
app.get('/', (express: express.Request, res:express.Response) => {
  res.send('Hello World!');
});

// Conexión a MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = uRI;
if (!uri) {
  throw new Error('La cadena de conexión a MongoDB no está definida.');
}
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación de la API en http://localhost:${port}/api-docs`);
});