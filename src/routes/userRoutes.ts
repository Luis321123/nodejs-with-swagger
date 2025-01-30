import express from 'express';
import { createUser, getUsers, updateUser } from '../controllers/user';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en la solicitud
 *       409:
 *         description: El correo electrónico ya está registrado
 */
router.post('/users', createUser);


export default router;

