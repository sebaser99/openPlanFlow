import { FC, useReducer, useEffect } from 'react';
import { Entry, EntryDeletedResponse, EntryUpdatedResponse } from '@/interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '@/apis';
import { useSnackbar } from 'notistack';


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
const {enqueueSnackbar} = useSnackbar()

const addNewEntry = async(description: string)=> {
    // const newEntry: Entry = {
    //     _id: uuidv4(),
    //     description,
    //     createdAt: Date.now(),
    //     status:  'pending'
    // }
    const {data} = await entriesApi.post<Entry>('/entries',{
        description
        
    })
    dispatch({type: '[Entries] new_entry', payload: data})
}
const updateEntry = async({_id, description, status}: Entry, showNoty = false)=> {
    try{
        const {data} = await entriesApi.put<EntryUpdatedResponse>(`/entries/${_id}`, {description, status})
        dispatch({type: '[Entries] update_entry', payload: data.updated})
        
        if(showNoty){
            enqueueSnackbar('Entrada Actualizada', {
                variant: 'success',
                autoHideDuration: 1000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })
        }
        
    }catch(err){
        console.log(err)
    }
   
}

const deleteEntry = async(id: string)=> {
    const {data} =  await entriesApi.delete<EntryDeletedResponse>(`/entries/${id}`)
    dispatch({type: '[Entries] delete_entries', payload: data.deleted})
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
    updateEntry,
    deleteEntry
}}>
{children}
</EntriesContext.Provider>)}