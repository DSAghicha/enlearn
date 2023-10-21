/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import { Request, Response } from 'express'
import { IResponse } from '../interfaces'

export default class Interceptors {
	// ------------------------------------------------------------------------------------------------------------------------
	static handleResponse = (req: Request, res: Response) => {
		const emitData = req.body.res as Partial<IResponse>
		const statusCode = emitData.code
		delete emitData.code
		res.status(statusCode!).send(emitData)
	}
}
