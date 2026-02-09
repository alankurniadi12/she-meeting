import AppError from '../utils/AppError.js';
import * as userRepository from '../repositories/user.repository.js';

// Returns paginated list of users. Accepts optional filter object and options {page,limit,sort}
async function getUsersService(filter = {}, options = {}) {
  const result = await userRepository.findAllUsersPaged(filter, options);
  if (!result) {
    throw new AppError('Gagal mengambil daftar user', 500);
  }

  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Daftar users berhasil diambil',
    data: result.docs,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    },
  };
}

async function updateUserService(userId, payload) {
  const updatedUser = await userRepository.updatedUser(userId, payload);
  if (!updatedUser) {
    throw new AppError('Gagal memperbarui data user', 500);
  }

  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Data user berhasil diperbarui',
    data: updatedUser,
  };
}

export { getUsersService, updateUserService };
