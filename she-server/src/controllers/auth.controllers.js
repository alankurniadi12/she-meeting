import { User } from "../models/user.model.js";
import generateToken  from "../utils/generate.token.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    // 2. cari user + include password
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // 3. compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // 4. generate token
    const token = generateToken(user._id);

    // 5. response (password otomatis tidak ikut)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        division: user.division,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login gagal",
      error: error.message,
    });
  }
};
