import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the email matches admin credentials
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
    }

    next();
  } catch (error) {
    console.error('❌ Authentication Error:', error);
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
  }
};

export default authAdmin;
