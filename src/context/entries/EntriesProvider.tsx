import { FC, useReducer, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'
import { Entry } from '@/interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '@/apis';


export interface EntriesState {
    entries: Entry[];
}

interface Props {
children: JSX.Element;}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
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
const refreshEntries = async()=> {
    const {data} = await entriesApi.get<Entry[]>('/entries')
    dispatch({type: '[Entries] refresh_entries', payload: data})
}

useEffect(() => {
    refreshEntries()
}, [])


return (
<EntriesContext.Provider value={{
    ...state,
    //Actions
    addNewEntry,
    updateEntry
}}>
{children}
</EntriesContext.Provider>)}