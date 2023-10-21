/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import express, { Application, json, raw, urlencoded } from 'express'
import EnvConfig from './configs/env.config'
import { FileLogger } from './utils'
import { Server } from './base'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app: Application = express()
const env = new EnvConfig()
const fileLogger = new FileLogger()
const server = new Server(app, env.HOST, env.PORT, fileLogger)
server.CONTROLLERS = []
server.MIDDLEWARES = [
	cookieParser(),
	cors({ origin: env.ALLOWED_HOSTS }),
	json({ limit: '10kb' }),
	raw(),
	urlencoded({ limit: '10kb', extended: true })
]
server.RUN
