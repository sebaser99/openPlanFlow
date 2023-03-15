import {FC, DragEvent, useContext} from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '@/interfaces'
import { UIContext } from '@/context/ui'
import { useRouter } from 'next/router'
import { dateFunctions } from '@/utils'


interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {
    const router = useRouter()

    const {setDraggingEntry} = useContext(UIContext)

    const onDragStart = (event: DragEvent<HTMLDivElement>)=> {
        event.dataTransfer.setData('id', entry._id)
        setDraggingEntry(true)
    }
    const onDragEnd = ()=> {
        setDraggingEntry(false)
    }
  return (
    <Card onClick={()=> router.push(`/entries/${entry._id}`)} sx={{marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>yar
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: 2}}>
                <Typography variant='body2'>{`Creada hace ${dateFunctions.getFormatDistanceTonow(entry.createdAt)}`}</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
