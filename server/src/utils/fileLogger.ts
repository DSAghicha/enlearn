/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import dayjs from 'dayjs'
import { appendFileSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import EnvConfig from '../configs/env.config'

export default class FileLogger {
	private base = `../../../logs`
	private logFilePath
	private date = dayjs().format('DD_MM_YYYY')
	private env = new EnvConfig()
	//------------------------------------------------------------------------------------------------------------------------//
	constructor() {
		this.logFilePath = resolve(__dirname, `${this.base}`)
		//? Logging Path Check & Create
		if (!existsSync(this.logFilePath)) {
			mkdirSync(this.logFilePath, { recursive: true })
		}
	}
	//------------------------------------------------------------------------------------------------------------------------//
	get dateTimeStamp(): string {
		return dayjs().format('DD/MM/YY HH:mm:ss')
	}
	//------------------------------------------------------------------------------------------------------------------------//
	infoLog = (namespace: string, message: string): void => {
		const log = `[${this.dateTimeStamp}] [INFO] [${namespace}] ${message}\n`
		if (this.env.DEBUG) appendFileSync(`${this.logFilePath}/info_${this.date}.log`, log)
	}
	//------------------------------------------------------------------------------------------------------------------------//
	errorLog = (namespace: string, message: string): void => {
		const log = `[${this.dateTimeStamp}] [ERROR] [${namespace}] ${message}\n`
		appendFileSync(`${this.logFilePath}/error_${this.date}.log`, log)
	}
	//------------------------------------------------------------------------------------------------------------------------//
	debugLog = (namespace: string, message: string): void => {
		const log = `[${this.dateTimeStamp}] [DEBUG] [${namespace}] ${message}\n`
		if (this.env.DEBUG) appendFileSync(`${this.logFilePath}/debug_${this.date}.log`, log)
	}
	//------------------------------------------------------------------------------------------------------------------------//
	reqLog = (message: string): void => {
		const log = `[${this.dateTimeStamp}]${message}\n`
		appendFileSync(`${this.logFilePath}/request_${this.date}.log`, log)
	}
}
