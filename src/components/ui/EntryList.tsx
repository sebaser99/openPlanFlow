import {FC, useContext, useMemo, DragEvent} from 'react'
import { Entry, EntryStatus } from "@/interfaces"
import { List, Paper } from "@mui/material"
import { EntryCard } from "./"
import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({status}) => { 
    const {entries, updateEntry} = useContext(EntriesContext)
    const {isDraggingEntry, setDraggingEntry} = useContext(UIContext)

    const entriesByStatus = useMemo(()=> entries.filter(entry => entry.status === status), [ entries])
    const allowDrop = (event: DragEvent<HTMLDivElement>)=> {
        event.preventDefault()
    }
    const onDropEntry = (event: DragEvent<HTMLDivElement>)=> {
      const id =  event.dataTransfer.getData('id')
      const entry = entries.find(e => e._id === id)!
      entry.status = status
      updateEntry(entry)
      setDraggingEntry(false)
    }
  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDraggingEntry ? styles.dragging : ''}>
        <Paper sx={{height:'calc(100vh - 180px)', backgroundColor:'transparent', padding: '2px 5px'}}>
            <List sx={{opacity: isDraggingEntry ? 0.3 : 1, transition: 'all .3s' }}>
                {
                  entriesByStatus.map(entry =>(  <EntryCard  key={entry._id} entry={entry}/>))
                }
               
            </List>
        </Paper>
    </div>
  )
}
