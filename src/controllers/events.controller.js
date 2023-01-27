import eventsServices from '../services/events.services.js';

export const getEvents = async (req, res) => {
  try {
    const events = (await eventsServices.getEvents())[0][0];
    if (!events.length) {
      return res.status(404).json({
        success: false,
        message: 'No events found'
      });
    }
    res.status(200).json({
      success: true,
      body: events
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

export const getEventsPaginated = async (req, res) => {
  const { query: { page, limit } } = req;

  try {
    const events = (await eventsServices.getEventsPaginated(page, limit))[0][0];
    if (!events.length) {
      return res.status(404).json({ 
        success: false, 
        message: 'No events found'
      });
    }
    res.status(200).json({ 
      success: true, 
      body: events 
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

export const getEventById = async (req, res) => {
  const { params: { eventId } } = req;
  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: 'Event does not exist'
    });
  }
  try {
    const event = (await eventsServices.getEventById(eventId))[0][0];
    if (!event.length) {
      return res.status(404).json({
        success: false,
        message: 'Event does not exist'
      });
    }
    res.status(200).json({
      success: true,
      body: event
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

export const createEvent = async (req, res) => {
  const { body } = req;
  if (!(body.event_name && body.img && body.is_active)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all fields' 
    });
  }
  try {
    const createdEvent = await eventsServices.createEvent(body);
    if (!createdEvent[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'Event not created'
      });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Event created', 
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

export const updateEvent = async (req, res) => {
  const { body, params: { eventId } } = req;
  if (!eventId) {
    return res.status(400).json({ 
      success: false,
      message: 'Event does not exist' 
    });
  }
  try {
    const updatedEvent = await eventsServices.updateEvent(eventId, body);
    if (!updatedEvent[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not updated' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Event updated', 
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

export const deleteEvent = async (req, res) => {
  const { params: { eventId } } = req;

  if (!eventId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Event does not exist' 
    });
  }
  try {
    const deletedEvent = await eventsServices.deleteEvent(eventId);
    if (!deletedEvent[0].affectedRows) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not deleted' 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: 'Event deleted' 
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