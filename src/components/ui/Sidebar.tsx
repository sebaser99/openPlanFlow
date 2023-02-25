import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Divider, ListItemText } from "@mui/material"
import { useContext } from "react"
import { UIContext } from "@/context"

const menuItems: string[] =['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
    const {sidemenuOpen, closeSideMenu} = useContext(UIContext)
  return (
    <Drawer
        anchor="left"
        open={sidemenuOpen}
        onClose={closeSideMenu}
    >
        <Box sx={{width:'250px'}}>
            <Box sx={{padding: '5px 10px'}}>
                <Typography variant="h4">Menu</Typography>
            </Box>
            <List>
                {menuItems.map((text, index)=> (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon/> }
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </Box>
        <Divider/>
    </Drawer>
  )
}
