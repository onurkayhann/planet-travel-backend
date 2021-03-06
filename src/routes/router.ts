import { Router } from "express";
import cors, { CorsOptions } from "cors";
import {
  register,
  login,
  logout,
  authorization,
} from "../controllers/AuthController";
import {
  getList,
  createTrip,
  getTrip,
  editTrip,
} from "../controllers/TripController";
import { getAllPlanets, getPlanet } from "../controllers/PlanetController";
import { getBlogs, getBlog } from "../controllers/BlogController";
import { getUser } from "../controllers/UserController";

const router = Router();
// Configure cors options allowed origins
const corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "https://helloworldstraveling.netlify.app"],
  credentials: true,
};

router.use(cors(corsOptions));

// ROUTES
// Public routes
router.post("/register", register);
router.post("/login", login);

// Planet routes
router.get("/planets", getAllPlanets);
router.get("/planets/:planet", getPlanet);

// Blogs routes
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);

// Protected routes
router.post("/logout", authorization, logout);
router.get("/user", authorization, getUser);
router.get("/get-list", authorization, getList);
router.get("/get-trip/:tripId", authorization, getTrip);
router.patch("/create-trip", authorization, createTrip);
router.patch("/edit-trip/:userId/:tripId", authorization, editTrip);

export default router;
