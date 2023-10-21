/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import { Application, NextFunction, Request, RequestHandler, Response } from 'express'
import http from 'http'
import { ConsoleLogger, FileLogger } from '../utils'
import { exit } from 'process'
import EnvConfig from '../configs/env.config'
import Controller from './controller'

export default class Server {
	private readonly NAMESPACE = 'SERVER'

	private app: Application
	private readonly host: string
	private readonly port: number
	private consoleLogger = new ConsoleLogger(this.NAMESPACE)
	private fileLogger: FileLogger
	private controllers: Array<Controller> = []
	private middlewares: Array<RequestHandler> = []
	private env = new EnvConfig()
	// ------------------------------------------------------------------------------------------------------------------------
	constructor(app: Application, host: string, port: number, fileLogger: FileLogger) {
		this.app = app
		this.host = host
		this.port = port
		this.fileLogger = fileLogger
	}
	// ------------------------------------------------------------------------------------------------------------------------
	private loadMiddleware = (): void => this.middlewares.forEach((middleware) => this.app.use(middleware))
	// ------------------------------------------------------------------------------------------------------------------------
	private loadControllers() {
		this.controllers.forEach((controller) => {
			this.app.use(controller.path, controller.setRoutes())
		})
	}
	// ------------------------------------------------------------------------------------------------------------------------
	private run = (): http.Server => {
		const server = this.app.listen(this.port, () => this.consoleLogger.info(`Server is running at ${this.host}:${this.port}`))
		process.on('unhandledRejection', (err: Error) => {
			this.consoleLogger.error(`Server Error: ${err.message}`, err)
			server.close(() => exit(1))
		})
		return server
	}
	// ------------------------------------------------------------------------------------------------------------------------
	private logRequest = (req: Request, res: Response, next: NextFunction) => {
		const txId = this.env.TxId
		this.fileLogger.reqLog(
			`[${txId}][${req.method}][${req.url}][${req.socket.remoteAddress}][${JSON.stringify(req.body)}][${JSON.stringify(req.query)}]`
		)
		req.body['trafficId'] = txId
		res.on('finish', () => {
			this.fileLogger.reqLog(`[${txId}][${req.method}][${req.url}][${req.socket.remoteAddress}][${res.statusCode}]`)
		})
		next()
	}
	// ------------------------------------------------------------------------------------------------------------------------
	set CONTROLLERS(controllers: Array<Controller>) {
		this.controllers = controllers
	}
	// ------------------------------------------------------------------------------------------------------------------------
	set MIDDLEWARES(middlewares: Array<RequestHandler>) {
		this.middlewares = middlewares
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get RUN(): void {
		this.loadMiddleware()
		this.app.use(this.logRequest)
		this.loadControllers()
		this.run()
		return
	}
}
