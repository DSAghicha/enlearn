/*
 * This file is part of Enlearn
 * DO NOT REMOVE this banner without the express permission of the project owner.
 */
export default interface IResponse {
	success: boolean
	code: number
	message: string
	refreshToken?: string
}
