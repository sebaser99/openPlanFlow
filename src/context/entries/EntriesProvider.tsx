import {v4 as uuidv4} from 'uuid'
import { Entry } from '@/interfaces';
import { FC, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';


export interface EntriesState {
    entries: Entry[];
}

interface Props {
children: JSX.Element;}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pending: Lorem ipsum dolor, sit amet consectetur adipisicing elit. ' ,
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'In-Progress: Lorem dolo fetch pafrag kolome vjiahha fjfjfjfj kdjjaii' ,
            status: 'in-progress',
            createdAt: Date.now() - 10000000
        },
        {
            _id: uuidv4(),
            description: 'Finished: maria se siente sola todos los días por eso hay que estar pendiente' ,
            status: 'finished',
            createdAt: Date.now() - 1000000
        }
    ],
}


export const EntriesProvider: FC<Props> = ({children})=>{
const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

const addNewEntry = (description: string)=> {
    const newEntry: Entry = {
        _id: uuidv4(),
        description,
        createdAt: Date.now(),
        status:  'pending'
    }
    dispatch({type: '[Entries] new_entry', payload: newEntry})
}
const updateEntry = (entry: Entry)=> {
    dispatch({type: '[Entries] update_entry', payload: entry})
}

return (
<EntriesContext.Provider value={{
    ...state,
    //Actions
    addNewEntry,
    updateEntry
}}>
{children}
</EntriesContext.Provider>)}