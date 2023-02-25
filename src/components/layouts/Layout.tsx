import Box from "@mui/material/Box";
import  Head  from "next/head";
import { FC } from "react";
import { NavBar, Sidebar } from "../ui";

interface Props {
    title?: string;
    children: JSX.Element
}

export const Layout:FC<Props> = ({title = 'Open Plan Flow', children}) => {
  return (
    <Box sx={{flexFlow: 1}}>
        <Head>
            <title>{title}</title>
        </Head>
        <NavBar/>
        <Sidebar/>
        
        <Box sx={{padding: '10px 20px'}}>
            {children}
        </Box>
    </Box>
  )
}
