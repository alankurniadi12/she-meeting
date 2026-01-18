import { 
  createFindingService,
  getAllFindingsService,
  getFindingByIdService,
  updateFindingService,
  deleteFindingService,
 } from '../services/finding.service.js';

export const createFinding = async (req, res, next) => {
  try {
    console.log("Creating finding with user:", req.user);
    if (!req.user || !req.user._id) {
      return res.status(401).json({ code: 401, message: 'Not authorized' });
    }
    const result = await createFindingService({
      ...req.body,
      userId: req.user._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error in createFinding:', error);
    next(error);
  }
};

export const getAllFindings = async (req, res, next) => {
  try {
    const filters = req.query || {};
    const result = await getAllFindingsService(filters);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in getAllFindings:', error);
    next(error);
  }
};

export const getFindingById = async (req, res, next) => {
  try {
    const result = await getFindingByIdService(req.params.id);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in getFindingById:', error);
    next(error);
  }
};

export const updateFinding = async (req, res, next) => {
  try {
    console.log("Updating finding with ID:", req.params.id, "by user:", req.user);
    if (!req.user || !req.user._id) {
      return res.status(401).json({ code: 401, message: 'Not authorized' });
    }
    const result = await updateFindingService(req.params.id, req.body, req.user._id);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in updateFinding:', error);
    next(error);
  }
};

export const deleteFinding = async (req, res, next) => {
  try {
    const result = await deleteFindingService(req.params.id);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in deleteFinding:', error);
    next(error);
  }
};