import teamsServices from '../services/teams.services.js';

export const getTeams = async (req, res) => {
  try {
    const teams = (await teamsServices.getTeams())[0][0];
    if (!teams.length) {
      return res.status(404).json({ 
        success: false, 
        message: 'No teams found'
      });
    }
    res.status(200).json({ 
      success: true, 
      body: teams
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

export const getTeamsPaginated = async (req, res) => {
  const { query: { page, limit } } = req;
  try {
    const teams = await teamsServices.getTeams(page, limit);
    if (!teams[0].length) {
      return res.status(404).json({
        success: false,
        message: 'No teams found'
      });
    }
    res.status(200).json({
      success: true,
      body: teams[0]
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

export const getTeamById = async (req, res) => {
  const { params: { teamId } } = req;
  if (!teamId) {
    return res.status(400).json({
      success: false,
      message: 'Team does not exist'
    });
  }
  try {
    const team = await teamsServices.getTeamById(teamId);
    if (!team[0].length) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    res.status(200).json({
      success: true,
      body: team[0]
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

export const createTeam = async (req, res) => {
  try {
    const { body } = req;
    if (!(body.team_name && body.badge)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all fields' 
      });
    }
    const createdTeam = await teamsServices.createTeam(body);
    if (!createdTeam[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team not created'
      });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Team created', 
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

export const updateTeam = async (req, res) => {
  const { body, params: { teamId } } = req;
  if (!teamId) {
    return res.status(400).json({ 
      success: false,
      message: 'Team does not exist' 
    });
  }
  try {
    const updatedTeam = await teamsServices.updateTeam(teamId, body);
    if (!updatedTeam[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not updated' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Team updated', 
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

export const deleteTeam = async (req, res) => {
  const { params: { teamId } } = req;

  if (!teamId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Team does not exist' 
    });
  }
  try {
    const deletedTeam = await teamsServices.deleteTeam(teamId);
    if (!deletedTeam[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not deleted' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Team deleted' 
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