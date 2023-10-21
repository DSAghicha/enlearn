/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import { NextFunction, Request, Response } from 'express'
import Methods from './methods'

export default interface IRoute {
	path: string
	method: Methods
	handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
	preMiddlewares: ((req: Request, res: Response, next: NextFunction) => void)[]
	postMiddlewares: ((req: Request, res: Response, next: NextFunction) => void)[]
}
