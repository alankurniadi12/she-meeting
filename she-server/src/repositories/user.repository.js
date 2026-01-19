import User from '../models/user.model.js';

async function existsByEmail(email) {
  return await User.exists({ email });
}

async function findByEmailWithPassword(email) {
  return await User.findOne({ email }).select('+password');
}

async function createUser(payload) {
  const user = await User.create(payload);
  return user;
}


async function findAllUsers(filter = {}) {
  // support pagination options: { page, limit, sort }
  return await User.find(filter).select('-password');
}

async function findAllUsersPaged(filter = {}, options = {}) {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Number(options.limit) || 20);
  const sort = options.sort || { createdAt: -1 };
  const skip = (page - 1) * limit;

  const [docs, total] = await Promise.all([
    User.find(filter).select('-password').sort(sort).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);

  return {
    docs,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export { existsByEmail, findByEmailWithPassword, createUser, findAllUsers, findAllUsersPaged };