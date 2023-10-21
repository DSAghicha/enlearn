/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import { IRoutes } from '../interfaces'
import { ConsoleLogger } from '../utils'
import { Router } from 'express'

export default abstract class Controller {
	protected NAMESPACE = 'CONTROLLER'
	public router: Router = Router()
	public abstract path: string
	protected abstract readonly routes: Array<IRoutes>

	protected consoleLogger = new ConsoleLogger(this.NAMESPACE)

	public setRoutes = (): Router => {
		for (const route of this.routes) {
			try {
				for (const middleware of route.preMiddlewares) {
					this.router[route.method](route.path, middleware)
				}
				this.router[route.method](route.path, route.handler)
				for (const middleware of route.postMiddlewares) {
					this.router[route.method](route.path, middleware)
				}
			} catch (err) {
				this.consoleLogger.error('Not a Valid Method')
			}
		}
		return this.router
	}
}
