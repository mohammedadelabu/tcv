import express, { NextFunction, Request, Response } from "express";
import { createEventController,deleteEventController,getEventController,updateEventController } from "../controller/event.controller";
import { createEventPoliy, deleteEventPoliy, updateEventPoliy } from "../middleware/event.validate";
import { loginPolicy, signupPolicy } from "../middleware/middleware";
const router = express.Router();



/*  Event routes */
router.get("/", getEventController);
router.post("/", createEventPoliy, createEventController);
router.put("/", updateEventPoliy, updateEventController);
router.delete("/", deleteEventPoliy, deleteEventController);


export default router;
