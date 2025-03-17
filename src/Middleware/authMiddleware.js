const jwt = require("jsonwebtoken");
const user = require("../Models/user")

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return
     res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) return 
        res.status(401).json({ message: "User not found" });
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
