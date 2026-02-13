import AppError from '../utils/appError.js';
import * as userRepository from '../repositories/user.repository.js';
import generateToken from '../utils/generate.token.js';
import bcrypt from 'bcrypt';

// { email, password }
// parameter email dan password diambl dari object request body
// yang dikrim dari controller

// AppError 
// digunakan untuk melempar error custom dengan message dan statusCode tertentu
// Hasil error ini akan di tangani oleh try-catch di controller
async function loginService({ email, password }) {

  const emailExist = await userRepository.existsByEmail(email);
  if (!emailExist) {
    throw new AppError("Email tidak ditemukan", 404);
  }

  const user = await userRepository.findByEmailWithPassword(email);

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

async function registerService({
  name,
  email,
  password,
  position,
  division,
  role,
  placeOfBirth,
  dateOfBirth,
  address,
  phone,
  employId,
  company,
  employmentStatus,
  yearJoined,
  retirementAge,
  isActive
}) {

  if (!name || !email || !password || !division) {
    throw new AppError('Field yang diperlukan: name, email, password, division', 400);
  }

  const emailExist = await userRepository.existsByEmail(email);
  if (emailExist) {
    throw new AppError('Email sudah terdaftar', 400);
  }

  const newUser = await userRepository.createUser({
    name,
    email,
    password,
    position,
    division,
    role,
    placeOfBirth,
    dateOfBirth,
    address,
    phone,
    employId,
    company,
    employmentStatus,
    yearJoined,
    retirementAge,
    isActive
  });

  const token = generateToken(newUser._id);

  return {
    code: 201,
    status: 'SUCCESS',
    message: 'Register berhasil',
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      placeOfBirth: newUser.placeOfBirth,
      dateOfBirth: newUser.dateOfBirth,
      address: newUser.address,
      phone: newUser.phone,
      employId: newUser.employId,
      position: newUser.position,
      division: newUser.division,
      company: newUser.company,
      employmentStatus: newUser.employmentStatus,
      yearJoined: newUser.yearJoined,
      retirementAge: newUser.retirementAge,
      isActive: newUser.isActive,
      role: newUser.role,
    },
  };

}

export { loginService, registerService };