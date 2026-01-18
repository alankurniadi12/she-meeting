import { loginService, registerService } from "../services/auth.service.js";

//route handler hanya boleh ada 3 parlameter: req, res, next
// jika ada 4 parameter (err, req, res, next), maka itu adalah error handling middleware
const loginController = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    //error yang masuk kedalam next() 
    //akan di tangani oleh error middleware (middlewares/error.middleware.js)
    console.error("Error in loginController:", error);
    next(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    console.log("Register request body:", req.body);
    const result = await registerService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error in registerController:", error);
    next(error);
  }
};

export { loginController, registerController };