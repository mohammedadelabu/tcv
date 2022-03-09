import express, { Request, Response, NextFunction } from "express";
import jwt, { VerifyOptions } from "jsonwebtoken";
import eventModel from "./../model/event.model";

export const getEventController = (req: any, res: Response, _next: NextFunction) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET_KEY as string,
    async function (err: any, data: any) {
      if (err) {
        res.sendStatus(403);
      } else {
        try {
          const data = await eventModel.find()
          res.status(200).json({ message: "success", data: data });
        } catch (error) {
          res.status(400).json({ error });
        }
      }
    }
  );
};

export const createEventController = async (req: any, res: Response) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET_KEY as string,
    async (err: any, data: any) => {
      if (err) {
        console.log(req.token);
        res.sendStatus(403);
      } else {
        try {
          let { title, description, category, date, isVirtual, address } =
            req.body;
          let data = await eventModel.insertMany({
            title,
            description,
            category,
            date,
            isVirtual,
            address,
          });
          data
            ? res.status(201).json({ message: "created Event", data })
            : res
                .status(400)
                .json({ message: "failed to create event" });
        } catch (error) {
          res.status(500).json({ message: "failed to create event", error });
        }
      }
    }
  );
};

export const updateEventController = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET_KEY as string,
    async (err: any, data: any) => {
      if (err) {
        //console.log(req.token);
        res.sendStatus(403);
      } else {
        try {
          let eventId = req.params.id;
          let { title, description, category, date, isVirtual, address } = req.body;
		  let query:any={$set:{}}
			for (const key in req.body) {
				if (Object.prototype.hasOwnProperty.call(req.body, key)) {
					// const element = req.body[key];
					query.$set[key]=req.body[key]
				}
			}
          let data = await eventModel.updateOne({_id:eventId},query).exec()
          data
            ? res.status(201).json({ message: "event updated successfully", data })
            : res.status(400).json({ message: "event failed to update", data });
        } catch (error) {
          res.status(400).send(error);
        }
      }
    }
  );
};

export const deleteEventController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  jwt.verify(
    req.token,
    process.env.JWT_SECRET_KEY as string,
    async (err: any, data: any) => {
      if (err) {
        res.sendStatus(403);
      } else {
        try {
          let { id } = req.params;
		  const data = await eventModel.deleteOne({ id: id});
          data
            ? res.status(201).json({ message: "Trashed!", data })
            : res.status(400).json({ message: "Event failed to delete" });
        } catch (error) {
          res.status(400).send(error);
        }
      }
    }
  );
};

