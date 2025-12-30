import jwt from "jsonwebtoken";

export const optionalVerifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];

    if (!token) {
        // No token? No problem. Just move to the controller as a guest.
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If token exists but is invalid, we still move on but don't set req.user
            return next();
        }
        req.user = user; 
        next();
    });
};