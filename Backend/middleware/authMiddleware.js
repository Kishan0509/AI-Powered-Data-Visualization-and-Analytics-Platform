const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token") || req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

module.exports = authMiddleware;