import AppError from '../utils/AppError.js';
import * as userRepository from '../repositories/user.repository.js';
import * as findingRepository from '../repositories/finding.repository.js';

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

async function getUserByIdService(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new AppError('User tidak ditemukan', 404);
  }

  const findings = await findingRepository.findByUserId(userId);
  const userData = typeof user.toObject === 'function' ? user.toObject() : user;
  const findingList = (findings || []).map((finding) => ({ id: finding._id }));

  return {
    code: 200,
    status: 'SUCCESS',
    message: 'Data user berhasil diambil',
    data: {
      ...userData,
      findings: findingList,
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

export { getUsersService, getUserByIdService, updateUserService };
