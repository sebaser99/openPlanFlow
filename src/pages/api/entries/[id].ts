import { db } from "@/database"
import { Entry, IEntry } from "@/models"
import mongoose, { isValidObjectId } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

type Data = 
| {message: string}
| {message: string, updated: IEntry}
| {message: string, deleted: IEntry}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const {id} = req.query
    if(!mongoose.isValidObjectId(id)){
        return res.status(401).json({message: 'No es un ID válido ' + id})
    }

    switch(req.method){
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getEntry(req, res)
        case 'DELETE':
            return deleteEntry(req, res)
        default:
            return res.status(400).json({message: 'Method no existe'})
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
     const {id} = req.query
     try{
        await db.connect()
        const entryToUpdate = await Entry.findById(id)

        if(!entryToUpdate){
            return res.status(401).json({message: 'No existe una entrada con ID: ' + id})
        }

        const {
                description = entryToUpdate.description, 
                status= entryToUpdate.status
            } = req.body
        try{
            const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true} )
            console.log(updatedEntry)  
            await db.disconnect()
            /*entryToUpdate.description = description;
                entryToUpdate.status = status;
                entryToUpdate.save() */ //otra manera de hacer la actualización en db

            res.status(200).json({message: "Se actualizó correctamente la entrada " + id, updated: updatedEntry!}) 

        } catch(err: any){
            console.log(err.errors.status.properties)
            await db.disconnect()
            res.status(400).json({message: `in property ${err.errors.status.properties.path}: ${err.errors.status.properties.message}`})
        }
       

     }catch(err){
        res.status(500).json({message: 'Error en conexión de la db'})
     }
}
    
const getEntry = async (req: NextApiRequest, res: NextApiResponse)=> {
    const {id} = req.query

    try{
        await db.connect()
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({message: "No es un id de mongo válido"})
        }
        try{
            const entry = await Entry.findById(id)
            if(!entry) return res.status(401).json({message: "no existe una entrada con id " + id})

            res.status(200).json({entry})
            await db.disconnect()
        
        } catch(err){
            console.log(err)
            await db.disconnect()
            res.status(500).json({message: 'No hay una entrada con es id'})
        }
        

    } catch(err){
        console.log(err)
        res.status(501).json({message: "No hay conexión a db"})
    }
   
}

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query

    try{
        await db.connect()
        const entryToUpdate = await Entry.findById(id)

        if(!entryToUpdate){
            return res.status(401).json({message: 'No existe una entrada con ID: ' + id})
        }
        const entry = await Entry.findByIdAndDelete(id)

        res.status(200).json({message: 'Se borró la entrada con el id' + id, deleted: entry!})
    }catch(err) {
        console.log(err)
        res.status(500).json({message: 'Ocurrió un error en el server'})
    }
}