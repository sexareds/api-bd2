import playersServices from '../services/players.services.js';

export const getPlayers = async (req, res) => {
  try {
    const players = await playersServices.getPlayers();
    if (!players[0].length) {
      return res.status(404).json({ 
        success: false,
        message: 'No players found'
      });
    }
    res.status(200).json({ 
      success: true, 
      body: players[0] 
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

export const createPlayer = async (req, res) => {
  const { body } = req;
  
  if (!(body.firstName && body.lastName && body.teamId && body.height && body.weight && body.position)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all fields' 
    });
  }
  try {
    const createdPlayer = await playersServices.createPlayer(body);
    if (!createdPlayer[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'Player not created'
      });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Player created', 
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

export const updatePlayer = async (req, res) => {
  const { body, params: { playerId } } = req;
  if (!playerId) {
    return res.status(400).json({ 
      success: false,
      message: 'Player does not exist' 
    });
  }
  try {
    const updatedPlayer = await playersServices.updatePlayer(playerId, body);
    if (!updatedPlayer[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Player not updated' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Player updated', 
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

export const deletePlayer = async (req, res) => {
  const { params: { playerId } } = req;

  if (!playerId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Player does not exist' 
    });
  }
  try {
    const deletedPlayer = await playersServices.deletePlayer(playerId);
    if (!deletedPlayer[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Player not deleted' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Player deleted' 
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