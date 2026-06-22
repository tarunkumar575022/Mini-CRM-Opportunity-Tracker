const Opportunity = require('../models/Opportunity');
const { successResponse, errorResponse } = require('../utils/apiResponse');

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Private
const getOpportunities = async (req, res, next) => {
  try {
    const { stage, priority, search, sortBy, order, page = 1, limit = 10 } = req.query;

    let query = {};

    // Filters
    if (stage) query.stage = stage;
    if (priority) query.priority = priority;
    if (search) {
      query.customerName = { $regex: search, $options: 'i' };
    }

    // Sort
    let sortObj = {};
    if (sortBy) {
      sortObj[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sortObj.createdAt = -1; // Default sort by newest
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const opportunities = await Opportunity.find(query)
      .populate('owner', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await Opportunity.countDocuments(query);

    // Add isOwner field
    const mappedOpportunities = opportunities.map((opp) => {
      const oppObj = opp.toObject();
      oppObj.isOwner = oppObj.owner._id.toString() === req.user._id.toString();
      return oppObj;
    });

    return successResponse(res, 200, 'Opportunities fetched successfully', {
      opportunities: mappedOpportunities,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create an opportunity
// @route   POST /api/opportunities
// @access  Private
const createOpportunity = async (req, res, next) => {
  try {
    // Strip owner fields from body to ensure security
    const { owner, user_id, created_by, ...opportunityData } = req.body;

    const opportunity = await Opportunity.create({
      ...opportunityData,
      owner: req.user._id, // ALways set from JWT
    });

    const populatedOpportunity = await Opportunity.findById(opportunity._id).populate('owner', 'name email');

    return successResponse(res, 201, 'Opportunity created successfully', populatedOpportunity);
  } catch (error) {
    next(error);
  }
};

// @desc    Get an opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Private
const getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('owner', 'name email');

    if (!opportunity) {
      return errorResponse(res, 404, 'Opportunity not found');
    }

    const oppObj = opportunity.toObject();
    oppObj.isOwner = oppObj.owner._id.toString() === req.user._id.toString();

    return successResponse(res, 200, 'Opportunity fetched successfully', oppObj);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an opportunity
// @route   PUT /api/opportunities/:id
// @access  Private
const updateOpportunity = async (req, res, next) => {
  try {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return errorResponse(res, 404, 'Opportunity not found');
    }

    // Ownership Check
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, 'You are not authorized to update this opportunity');
    }

    // Strip owner from update body
    const { owner, user_id, created_by, ...updateData } = req.body;

    const allowedFields = [
      'customerName', 'contactName', 'contactEmail', 'contactPhone', 
      'requirement', 'estimatedValue', 'stage', 'priority', 
      'nextFollowUpDate', 'notes'
    ];

    const finalUpdateData = {};
    for (const key of Object.keys(updateData)) {
      if (allowedFields.includes(key)) {
        finalUpdateData[key] = updateData[key];
      }
    }

    opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      finalUpdateData,
      { new: true, runValidators: true }
    ).populate('owner', 'name email');

    return successResponse(res, 200, 'Opportunity updated successfully', opportunity);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private
const deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return errorResponse(res, 404, 'Opportunity not found');
    }

    // Ownership Check
    if (opportunity.owner.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, 'You are not authorized to delete this opportunity');
    }

    await opportunity.deleteOne();

    return successResponse(res, 200, 'Opportunity deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOpportunities,
  createOpportunity,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
};
