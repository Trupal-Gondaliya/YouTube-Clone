import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    if (
        req.headers &&
        req.headers['authorization'] &&
        req.headers['authorization']?.split(" ")[1]
    ) {
        const token = req.headers['authorization']?.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Token is not valid!" });
            req.user = user; // Contains user ID from payload
            next();
        });
    }
    else {
        return res.status(404).json({"msg": "Token Not Found"})
    }

};