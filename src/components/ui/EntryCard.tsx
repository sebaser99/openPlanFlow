import {FC, DragEvent, useContext} from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces'
import { UIContext } from '@/context/ui'

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {
    const {setDraggingEntry} = useContext(UIContext)

    const onDragStart = (event: DragEvent<HTMLDivElement>)=> {
        event.dataTransfer.setData('id', entry._id)
        setDraggingEntry(true)
    }
    const onDragEnd = ()=> {
        setDraggingEntry(false)
    }
  return (
    <Card sx={{marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: 2}}>
                <Typography variant='body2'>Hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
