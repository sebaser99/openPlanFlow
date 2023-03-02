import { Inter } from 'next/font/google'
import Typography from '@mui/material/Typography'
import { NextPage } from 'next'
import { Layout } from '@/components/layouts'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { EntryList } from '@/components/ui'
import { NewEntry } from '@/components/ui/NewEntry'

const inter = Inter({ subsets: ['latin'] })

const HomePage : NextPage  = ()=>  {
  return (
    <>
      <Layout title='Home - OpenPlanFlow'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{height:'calc(100vh -100px)', padding: '20px'}}>
              <CardHeader title='Pendings' />
                {/* agregar una nueva entrada*/}
                {/* listado de las entradas*/}
                <NewEntry/>
                <EntryList status='pending' />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{height:'calc(100vh -100px)'}}>
              <CardHeader title='In progress' />
                {/* agregar una nueva entrada*/}
                {/* listado de las entradas*/}
                <EntryList status='in-progress' />
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{height:'calc(100vh -100px)'}}>
              <CardHeader title='Finished' />
                {/* agregar una nueva entrada*/}
                {/* listado de las entradas*/}
                <EntryList status='finished'/>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}
export default HomePage