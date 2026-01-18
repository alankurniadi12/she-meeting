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

export { existsByEmail, findByEmailWithPassword, createUser };

