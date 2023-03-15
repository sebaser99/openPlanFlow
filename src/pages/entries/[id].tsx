import {useState, ChangeEvent, useMemo, FC, useContext} from 'react'
import { GetServerSideProps } from 'next'

import { Layout } from "@/components/layouts"
import {capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {pink} from '@mui/material/colors';
import { Entry, EntryStatus } from "@/interfaces";
import { useForm } from "@/hooks";
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> =  ({entry}) => {
    const {updateEntry, deleteEntry} = useContext(EntriesContext)

    const router = useRouter()
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)
    const {formValue, handleChangeInput, reset} = useForm({
        text:entry.description
    })

    
    const isNotValid = useMemo(()=>formValue.text.length <= 0 && touched, [formValue.text, touched])

    const handleChangeStatus = ({target}: ChangeEvent<HTMLInputElement>)=> {
            console.log(target.value)
            setStatus(target.value as EntryStatus)
    }
    const onSave = ()=> {
        if(formValue.text.trim().length === 0) return 

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: formValue.text
        }
        updateEntry(updatedEntry, true)
    }

    const onDelete = ()=> {
        deleteEntry(entry._id)
        router.push('/')
    }
  return (
    <Layout title={formValue.text.substring(0, 20) + '...'}>
        <>
            <Grid container
                justifyContent='center'
                sx={{marginTop: 2}}
            >
                <Grid item  xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader 
                            title='Entrada'
                            subheader={`Creada hace ${dateFunctions.getFormatDistanceTonow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                value={formValue.text}
                                name='text'
                                sx={{marginTop:2, marginBottom: 1}}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                onBlur={()=> setTouched(true)}
                                label='Nueva Entrada'
                                onChange={handleChangeInput}
                                helperText={isNotValid && 'Ingresa una entrada'}
                                error={isNotValid}
                            />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup  row onChange={handleChangeStatus} value={status}>
                                    {validStatus.map(option =>(
                                        <FormControlLabel 
                                            key={option}    
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                            
                                        />

                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={<SaveOutlinedIcon/>} variant='contained' fullWidth
                                onClick={onSave} disabled={formValue.text.length <= 0}
                            >SAVE</Button>
                        </CardActions>
                        
                    </Card>
                </Grid>

            </Grid>
            <IconButton sx={{position: 'fixed', bottom: 30, right: {xs: 30, md: 70, lg: 200}, backgroundColor: pink[700]}}
                onClick={onDelete}
            >
                <DeleteOutlineOutlinedIcon fontSize='large'/>
            </IconButton>
        </>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {id} = params as {id: string}
    const entry = await dbEntries.getEntryById(id)
    if(!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage