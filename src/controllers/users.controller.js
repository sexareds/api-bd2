import e from 'express';
import usersServices from '../services/users.services.js';
import { getTokenData } from '../config/jwt.config.js';

export const getUsers = async (req, res) => {
  try {
    const users = (await usersServices.getUsers())[0][0];
    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: 'No users found'
      });
    }
    res.status(200).json({
      success: true,
      body: users
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

export const getUsersPaginated = async (req, res) => {
  const { query: { page, limit } } = req;

  try {
    const users = (await usersServices.getUsersPaginated(page, limit))[0][0];
    if (!users.length) {
      res.status(404).json({
        success: false,
        message: 'No users found'
      });
    }
    res.status(200).json({
      success: true,
      body: users[0]
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  const { params: { userId } } = req;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User does not exist'
    });
  }
  try {
    const user = (await usersServices.getUserById(userId))[0][0];
    if (!user.length) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      body: user
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// creates a new user
export const createUser = async (req, res) => {
  const { body } = req;
  if (!(body.user_name && body.user_role && body.email && body.user_password)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all fields' 
    });
  }
  try {
    const createdUser = await usersServices.createUser(body);
    if (!createdUser[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'User not created' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'User created', 
      data: body 
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ 
      success: false, 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};

// a method that updates an user in the database
export const updateUser = async (req, res) => {
  const { body, params: { userId } } = req;

  if (!userId) {
    return res.status(400).json({ 
      success: false, 
      message: 'User does not exist' 
    });
  }
  try {
    const updatedUser = await usersServices.updateUser(userId, body);
    if (!updatedUser[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not updated' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'User updated', 
      data: body
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ 
      success: false, 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};

// a method that deletes an user from the database
export const deleteUser = async (req, res) => {
  const { params: { userId } } = req;

  if (!userId) {
    return res.status(400).json({ 
      success: false, 
      message: 'User does not exist' 
    });
  }
  try {
    const deletedUser = await usersServices.deleteUser(userId);
    if (!deletedUser[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not deleted' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'User deleted' 
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ 
      success: false, 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};

export const checkDailyReward = async (req, res) => {
  var token = req.headers.authorization;
  token = token.replace('Bearer ', '');
  const email = getTokenData(token).data.email;
  try {
    const reward = (await usersServices.checkDailyReward(email))[0][0];
    console.log(reward);
    if (!reward.daily_reward) {
      return res.status(404).json({ 
        message: 'Tienes tu cromo diario disponible!'
      });
    }else{
      const actualDate = new Date();
      const sqlDate = new Date(reward.daily_reward);
      const diff = Math.abs(actualDate.getTime() - sqlDate.getTime());
      const diffInHours = diff / (1000 * 60 * 60);
      if (diffInHours > 24){
        return res.status(404).json({
          message: 'Tienes tu cromo diario disponible!'
        });
      }else{
        return res.status(200).json({
          message: 'Ya has reclamado tu cromo diario!'
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ 
      success: false, 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};
