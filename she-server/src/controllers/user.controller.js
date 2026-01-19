import { getUsersService } from '../services/user.service.js';

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

export { getUsersController };
