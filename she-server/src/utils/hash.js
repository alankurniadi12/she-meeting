import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const rounds = Number(process.env.SALT_ROUNDS) || 12;
  return await bcrypt.hash(password, rounds);
}

async function comparePassword(candidate, hash) {
  return await bcrypt.compare(candidate, hash);
}

export { hashPassword, comparePassword };
