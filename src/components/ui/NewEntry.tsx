import {useContext, useState} from 'react'
import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from '@/hooks';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

const INITIAL_STATE = {
    text: ''
}

export const NewEntry = () => {
    const [touched, setTouched] = useState(false)
    const {addNewEntry} = useContext(EntriesContext)
    const {isAddingEntry, setAddingEntry} = useContext(UIContext)

    const {formValue, handleChangeInput, reset} = useForm(INITIAL_STATE)
    const {text} = formValue
    
    const save = ()=> {
        if(text.length <= 0 ) return
        addNewEntry(text)
        setAddingEntry(false)
        setTouched(false)
        reset()
    }
    const cancel = ()=> {
        setAddingEntry(false)
        reset()
    }

  return (
    <>
        {
            isAddingEntry === true ? (
                <>
                   <TextField name='text' value={text}  onChange={handleChangeInput} fullWidth placeholder="Nueva Entrada" sx={{marginTop: 2, marginBottom: 1}}
                        autoFocus multiline label='Nueva Entrada' helperText={text.length <= 0 && touched && 'Ingrese un valor'}
                        error={text.length <= 0 && touched} onBlur={()=> setTouched(true)}
                    />
                    <Box display='flex' justifyContent='space-between' sx={{marginBottom: 1}} > 
                        <Button variant="text"  onClick={cancel}>Cancelar</Button>
                        <Button variant='outlined' color="secondary" endIcon={<SaveOutlinedIcon/>} onClick={save}>Guardar</Button>
                    </Box>
                </>
            ) 
            :(
                <Box sx={{marginBottom:2, paddingX: 1}}  onClick={()=> setAddingEntry(true)}>
                    <Button fullWidth variant="outlined" startIcon={<AddCircleOutlineOutlinedIcon
                    />}>Agregar Tarea</Button>
                </Box>
            )
        }
      
      
    </>
    
  )
}
