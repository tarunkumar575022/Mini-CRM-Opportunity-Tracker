const express = require('express');
const {
  getOpportunities,
  createOpportunity,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { body } = require('express-validator');

const router = express.Router();

router.use(protect); // All opportunity routes are protected

router
  .route('/')
  .get(getOpportunities)
  .post(
    [
      body('customerName').trim().notEmpty().withMessage('Customer Name is required'),
      body('requirement').trim().notEmpty().withMessage('Requirement is required'),
      body('estimatedValue')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Estimated value must be a positive number'),
    ],
    validateRequest,
    createOpportunity
  );

router
  .route('/:id')
  .get(getOpportunityById)
  .put(updateOpportunity)
  .delete(deleteOpportunity);

module.exports = router;
