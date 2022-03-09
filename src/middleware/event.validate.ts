import { Request,Response,NextFunction } from "express";
import Joi from "joi";

export const createEventPoliy = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
        title: Joi.string().max(255).required(),
        description:Joi.string().max(255).required(),
        category: Joi.string().max(255).required(),
        date: Joi.date(),
        isVirtual: Joi.boolean(),
        address: Joi.string().max(255).required(),
	});
	const { title, description, category, date, isVirtual, address } = req.body;
	const { error }: any = schema.validate({ title, description, category, date, isVirtual, address });
	if (error) {
		return res
			.status(500)
			.json({ message: error.details[0].message.split('"').join("") });
	}
	return next();
};
export const deleteEventPoliy = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		id: Joi.string().min(5).required(),
	});
	const { id } = req.params;
	const { error }: any = schema.validate({ id });
	if (error) {
		return res
			.status(500)
			.json({ message: error.details[0].message.split('"').join("") });
	}
	return next();
};
export const updateEventPoliy = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object({
		id: Joi.string().min(5).required(),
	});
	const { id } = req.params;
	const { error }: any = schema.validate({ id });
	if (error) {
		return res
			.status(500)
			.json({ message: error.details[0].message.split('"').join("") });
	}
	return next();
};


