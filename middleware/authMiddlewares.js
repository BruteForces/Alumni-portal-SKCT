import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Alumni from "../models/Alumni.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      const alumni = await Alumni.findOne({ user: decoded.id });
      req.user = await User.findById(decoded.id).select("-password");
      req.user.isAlumni = false;
      if (alumni?.isApproved) {
        req.user.isAlumni = true;
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const alumni = (req, res, next) => {
  if (req.user && req.user.isAlumni) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an alumni");
  }
};

const alumniOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isAlumni || req.user.isAdmin)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an alumni or admin");
  }
};

export { protect, admin, alumni, alumniOrAdmin };
