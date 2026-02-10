import { getUsersService, getUserByIdService, updateUserService } from '../services/user.service.js';

const getUsersController = async (req, res, next) => {
  try {
    const { page, limit, sort, ...rest } = req.query || {};
    const filter = { ...rest };
    const options = { page, limit, sort };
    const result = await getUsersService(filter, options);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in getUsersController:', error);
    next(error);
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await getUserByIdService(userId);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in getUserByIdController:', error);
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const payload = req.body;
    const result = await updateUserService(userId, payload);
    return res.status(result.code).json(result);
  } catch (error) {
    console.error('Error in updateUserController:', error);
    next(error);
  }
};

export { getUsersController, getUserByIdController, updateUserController };
