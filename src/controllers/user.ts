import express from 'express';
import { User } from '../models/users'; // Importa el modelo y la interfaz
import { IUser } from '../schemas/Users'; // Importa la interfaz de usuario

// Crear un usuario
export const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const user: IUser = new User(req.body); // Crea una instancia del modelo User
    const savedUser = await user.save(); // Guarda el usuario en la base de datos
    res.status(201).json(savedUser); // Devuelve el usuario guardado
  } catch (error) {
    console.error(error); // Registra el error en la consola
    res.status(400).json({ message: "Error al crear el usuario" }); // Devuelve un mensaje de error
  }
};

// Obtener todos los usuarios
export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users: IUser[] = await User.find(); // Busca todos los usuarios
    res.json(users); // Devuelve la lista de usuarios
  } catch (error) {
    console.error(error); // Registra el error en la consola
    res.status(500).json({ message: 'Error al obtener los usuarios' }); // Devuelve un mensaje de error
  }
};

// Actualizar un usuario
export const updateUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la ruta
  const { name, age, email } = req.body; // Extrae los campos a actualizar

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' }); // Si no existe, devuelve un error 404
    }

    res.json(updatedUser); // Devuelve el usuario actualizado
  } catch (error) {
    console.error(error); // Registra el error en la consola
    res.status(500).json({ message: 'Error al actualizar el usuario' }); // Devuelve un mensaje de error
  }
};