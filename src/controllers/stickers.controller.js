import { getToken, getTokenData } from '../config/jwt.config.js';
import stickersServices from '../services/stickers.services.js';

export const getStickers = async (req, res) => {
  try {
    const stickers = await stickersServices.getStickers();
    if (!stickers[0].length) {
      return res.status(404).json({ 
        success: false, 
        message: 'No stickers found'
      });
    }
    res.status(200).json({ 
      success: true, 
      body: stickers[0] 
    });
  } catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ 
      success: false, 
      message: `Internal Server Error`, 
      error: error.message
    });
  }
};

export const createSticker = async (req, res) => {
  const { body } = req;
  if (!(body.playerId && body.img && body.eventId && body.teamId && body.appearanceRate)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all fields' 
    });
  }
  try {
    const createdSticker = await stickersServices.createSticker(body);
    if (!createdSticker[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'Sticker not created'
      });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Sticker created', 
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

export const updateSticker = async (req, res) => {
  const { body, params: { stickerId } } = req;
  if (!stickerId) {
    return res.status(400).json({ 
      success: false,
      message: 'sticker does not exist' 
    });
  }
  try {
    const updatedSticker = await stickersServices.updateSticker(stickerId, body);
    if (!updatedSticker[0].affectedRows) {
      return res.status(404).json({
        success: false, 
        message: 'Sticker not updated' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Sticker updated', 
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

export const deleteSticker = async (req, res) => {
  const { params: { stickerId } } = req;

  if (!stickerId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Sticker does not exist' 
    });
  }
  try {
    const deletedSticker = await stickersServices.deleteSticker(stickerId);
    if (!deletedSticker[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sticker not deleted' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Sticker deleted' 
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

export const getUserStickers = async (req, res) => {
  var token = req.headers.authorization;
  token = token.replace('Bearer ', '');
  const email = getTokenData(token).data.email;
  try {
    const userStickers = (await stickersServices.getUserStickers(email))[0][0];
    if (!userStickers.length) {
      return res.status(404).json({ 
        success: false, 
        message: 'No stickers found'
      });
    }
    res.status(200).json({ 
      Stickers: userStickers 
    });
  }
  catch (error) {
    console.log(error);
    res.status(error?.status || 500).json({ 
      success: false, 
      message: `Internal Server Error`, 
      error: error.message
    });
  }
};