import { Inter } from 'next/font/google'
import Typography from '@mui/material/Typography'
import { NextPage } from 'next'
import { Layout } from '@/components/layouts'

const inter = Inter({ subsets: ['latin'] })

const HomePage : NextPage  = ()=>  {
  return (
    <>
      <Layout>
        <Typography variant="h1" color="primary">Hola mundo</Typography>
      </Layout>
    </>
  )
}
export default HomePage