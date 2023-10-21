/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import { version } from '../../../../package.json'
import { Controller } from '../../base'
import { IRoutes, Methods } from '../../interfaces'
import { ConsoleLogger } from '../../utils'

export default class ApiController extends Controller {
	NAMESPACE = 'API-CONTROLLER'
	constructor() {
		super()
		this.consoleLogger = new ConsoleLogger(this.NAMESPACE)
		this.consoleLogger.info('LOADED')
	}
	public path = '/api'
	protected routes: IRoutes[] = [
		{
			path: '/',
			method: Methods.GET,
			handler: (_, res) => {
				res.status(200).send(`Welcome to EnLearn v${version}`)
			},
			preMiddlewares: [],
			postMiddlewares: []
		}
	]
}
