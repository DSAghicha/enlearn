/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */

import dayjs from 'dayjs'

export default class ConsoleLogger {
	protected namespace: string

	constructor(namespace: string) {
		this.namespace = namespace ?? 'LOGGER'
	}

	getDateTimeStamp() {
		return dayjs().format('DD/MM/YY HH:mm')
	}

	info(message: string, object?: unknown) {
		if (object) {
			console.info(`[${this.getDateTimeStamp()}] [INFO] [${this.namespace}] ${message}`, object)
		} else {
			console.info(`[${this.getDateTimeStamp()}] [INFO] [${this.namespace}] ${message}`)
		}
	}

	warn(message: string, object?: unknown) {
		if (object) {
			console.warn(`[${this.getDateTimeStamp()}] [WARN] [${this.namespace}] ${message}`, object)
		} else {
			console.warn(`[${this.getDateTimeStamp()}] [WARN] [${this.namespace}] ${message}`)
		}
	}

	error(message: string, object?: unknown) {
		if (object) {
			console.error(`[${this.getDateTimeStamp()}] [ERR] [${this.namespace}] ${message}\n`, object)
		} else {
			console.error(`[${this.getDateTimeStamp()}] [ERR] [${this.namespace}] ${message}`)
		}
	}

	tabular(message: string, object: unknown) {
		console.log(`[${this.getDateTimeStamp()}] [TABLE] [${this.namespace}] ${message}`)
		console.table(object)
	}

	debug(message: string, object?: unknown) {
		if (object) {
			console.debug(`[${this.getDateTimeStamp()}] [DEBUG] [${this.namespace}] ${message}`, object)
		} else {
			console.debug(`[${this.getDateTimeStamp()}] [DEBUG] [${this.namespace}] ${message}`)
		}
	}
}
