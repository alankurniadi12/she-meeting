import AppError from '../utils/appError.js';
import User from '../models/user.model.js';
import generateToken from '../utils/generate.token.js';
import bcrypt from 'bcrypt';

// { email, password }
// parameter email dan password diambl dari object request body
// yang dikrim dari controller

// AppError 
// digunakan untuk melempar error custom dengan message dan statusCode tertentu
// Hasil error ini akan di tangani oleh try-catch di controller
async function loginService({ email, password }) {

  const emailExist = await User.exists({ email });
  if (!emailExist) {
    throw new AppError("Email tidak ditemukan", 404);
  }

  const user = await User.findOne({ email }).select("+password");

  const passwordIsMatch = await bcrypt.compare(password, user.password);
  if (!passwordIsMatch) {
    throw new AppError("Password salah", 400);
  }

  const emailIsActive = user.isActive;
  if (!emailIsActive) {
    throw new AppError("Akun tidak aktif. Silakan hubungi ICT Admin.", 403);
  }

  const token = generateToken(user._id);

  return {
    code: 200,
    status: "SUCCESS",
    message: "Login berhasil",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      position: user.position,
      division: user.division,
      isActive: user.isActive,
      role: user.role
    },
  };
}

export { loginService };