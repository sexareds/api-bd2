import gamesServices from '../services/games.services.js';

export const getGames = async (req, res) => {
  try {
    const games = await gamesServices.getGames();
    if (!games[0].length) {
      return res.status(404).json({ 
        success: false, 
        message: 'No games found'
      });
    }
    res.status(200).json({ 
      success: true, 
      body: games[0] 
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

export const createGame = async (req, res) => {
  const { body } = req;
  if (!(body.teamOne && body.teamTwo && body.matchedAt && body.eventId && body.result && body.winner)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all fields' 
    });
  }
  try {
    const createdGame = await gamesServices.createGame(body);
    if (!createdGame[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'Game not created'
      });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Game created', 
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

export const updateGame = async (req, res) => {
  const { body, params: { gameId } } = req;
  if (!gameId) {
    return res.status(400).json({ 
      success: false,
      message: 'Game does not exist' 
    });
  }
  try {
    const updatedGame = await gamesServices.updateGame(gameId, body);
    if (!updatedGame[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Game not updated' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Game updated', 
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

export const deleteGame = async (req, res) => {
  const { params: { gameId } } = req;

  if (!gameId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Game does not exist' 
    });
  }
  try {
    const deletedGame = await gamesServices.deleteGame(gameId);
    if (!deletedGame[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Game not deleted' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Game deleted' 
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