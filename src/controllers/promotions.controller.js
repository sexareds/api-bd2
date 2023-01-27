import promotionsServices from '../services/promotions.services.js';

export const getPromotions = async (req, res) => {
  try {
    const promotions = await promotionsServices.getPromotions();
    if (!promotions[0].length) {
      return res.status(404).json({ 
        success: false, 
        message: 'No promotions found'
      });
    }
    res.status(200).json({ 
      success: true, 
      body: promotions[0] 
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

export const createPromotion = async (req, res) => {
  try {
    const { body } = req;
    if (!(body.alias && body.promotion_type && body.redirect_to && body.img && body.description)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all fields' 
      });
    }
    const createdPromotion = await promotionsServices.createPromotion(body);
    if (!createdPromotion[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'Promotion not created'
      });
    }
    res.status(201).json({ 
      success: true, 
      message: 'Promotion created', 
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