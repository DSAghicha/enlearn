/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
import { randomBytes } from 'crypto'
import dotenv from 'dotenv'
import { resolve } from 'path'

export default class EnvConfig {
	private readonly BASE = '../../config'
	private ENV = process.env.NODE_ENV?.trim()
	constructor() {
		if (!this.ENV) throw 'Configuration Error: Environment not found'
		const fileName = this.ENV === 'DEV' ? '.dev.env' : '.prod.env'
		// console.log(`ENV PATH -> ${resolve(__dirname, this.#BASE, fileName)}`);
		dotenv.config({ path: resolve(__dirname, this.BASE, fileName) })
		this.checkValidity()
	}
	// ------------------------------------------------------------------------------------------------------------------------
	private checkValidity = () => {
		if (
			!process.env.ALLOWED_HOSTS ||
			!process.env.CLOUD_NAME ||
			!process.env.CLOUD_KEY ||
			!process.env.CLOUD_SECRET ||
			!process.env.CLOUDINARY_URL ||
			!process.env.DB_URI ||
			!process.env.HOST ||
			!process.env.JWT_PK ||
			!process.env.SMTP_EMAIL ||
			!process.env.SMTP_HOST ||
			!process.env.SMTP_PASSE ||
			!process.env.SMTP_PORT ||
			!process.env.SMTP_SERVICE ||
			!process.env.PASSE ||
			!process.env.PORT ||
			!process.env.REDIS_URI
		)
			throw 'Unable to read environment values'
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get ALLOWED_HOSTS(): Array<string> {
		const allowedHosts = process.env.ALLOWED_HOSTS!
		return allowedHosts.split('|')
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get CLOUD_NAME(): string {
		return process.env.CLOUD_NAME as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get CLOUD_KEY(): string {
		return process.env.CLOUD_KEY as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get CLOUD_SECRET(): string {
		return process.env.CLOUD_SECRET as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get CLOUDINARY_URL(): string {
		return process.env.CLOUDINARY_URL as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get DB_URI(): string {
		return process.env.DB_URI as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get DB_NAME(): string {
		return 'enlearn'
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get DB_PASSE(): string {
		return process.env.PASSE as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get DEBUG(): boolean {
		const debug = process.env.DEBUG
		return debug ? true : false
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get HOST(): string {
		return process.env.HOST as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get JWT_PK(): string {
		return process.env.JWT_PK as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get SMTP_EMAIL(): string {
		return process.env.SMTP_EMAIL as string
	} // ------------------------------------------------------------------------------------------------------------------------
	get SMTP_HOST(): string {
		return process.env.SMTP_HOST as string
	} // ------------------------------------------------------------------------------------------------------------------------
	get SMTP_PASSE(): string {
		return process.env.SMTP_PASSE as string
	} // ------------------------------------------------------------------------------------------------------------------------
	get SMTP_PORT(): number {
		return Number(process.env.SMTP_PORT)
	} // ------------------------------------------------------------------------------------------------------------------------
	get SMTP_SERVICE(): string {
		return process.env.SMTP_SERVICE as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get PORT(): number {
		return Number(process.env.PORT)
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get REDIS_URI(): string {
		return process.env.REDIS_URI as string
	}
	// ------------------------------------------------------------------------------------------------------------------------
	get TxId(): string {
		return randomBytes(12).toString('hex')
	}
}
