import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklist.model.js';

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "Token not provided."
    })
  }

  const isTokenBlacklisted = blacklistTokenModel.findOne({ token });

  if (!isTokenBlacklisted) {
    res.status(401).json({
      message: "Token is invalid.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token invalid.",
    });
    
  }
}

export { authUser };