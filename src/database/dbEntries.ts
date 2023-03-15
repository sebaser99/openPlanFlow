import { Entry } from "@/models"
import { isValidObjectId } from "mongoose"
import { db } from "."

export const getEntryById = async(id: string)=> {
    if(!isValidObjectId(id)) return null
    await db.connect()
    const entry = await Entry.findById(id).lean()
    await db.disconnect()
    return JSON.parse(JSON.stringify(entry))
}