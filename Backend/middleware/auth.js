import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success: true, message: "Not authorized, please login first."});
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: "Not authorized, please login first."});
    }
}

export default authMiddleware;