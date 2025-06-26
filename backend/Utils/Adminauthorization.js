const isAdminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
        next()
    } else {
        return res.status(403).send("Access denied, you are not an admin");
    }
};
export default isAdminMiddleware;