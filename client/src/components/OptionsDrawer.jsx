import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Import Material-UI Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Add an icon for admin button

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OptionsDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  console.log(location.pathname);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        padding: '10px',
        fontSize: '14px',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {['Create Gallery Entry', 'Edit Gallery Entry', 'Delete Gallery Entry'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              marginBottom: '8px',
              paddingLeft: '10px',
            }}
          >
            <ListItemButton onClick={() => {
              text === 'Create Gallery Entry' && navigate('/create-painting');
              text === 'Edit Gallery Entry' && navigate('/edit-painting');
              text === 'Delete Gallery Entry' && navigate('/delete-painting');
            }}>
              <ListItemIcon sx={{ minWidth: '36px' }}>
                {text === 'Create Gallery Entry' && <AddCircleOutlineIcon />}
                {text === 'Edit Gallery Entry' && <EditIcon />}
                {text === 'Delete Gallery Entry' && <DeleteIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ fontSize: '14px' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Conditional rendering based on user role */}
      <Divider />

      {/* Show "To Gallery" option for both admin and viewer */}
      <List>
        <ListItem disablePadding sx={{ marginBottom: '8px', paddingLeft: '10px' }}>
          <ListItemButton onClick={() => {
            if (location.pathname !== '/gallery') {
              navigate('/gallery');
            }
          }}>
            <ListItemIcon sx={{ minWidth: '36px' }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="To Gallery"
              primaryTypographyProps={{ fontSize: '14px' }}
            />
          </ListItemButton>
        </ListItem>

        {/* Show "To House Painters" only for admin */}
        {user?.role === 'admin' && (
          <ListItem disablePadding sx={{ marginBottom: '8px', paddingLeft: '10px' }}>
            <ListItemButton onClick={() => {
              if (location.pathname !== '/painters') {
                navigate('/painters');
              }
            }}>
              <ListItemIcon sx={{ minWidth: '36px' }}>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="To House Painters"
                primaryTypographyProps={{ fontSize: '14px' }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider />
      <List>
        <ListItem disablePadding sx={{ marginTop: '10px', paddingLeft: '10px' }}>
          <ListItemButton onClick={() => {
            if (user) {
              dispatch(logout());
            }
          }}>
            <ListItemIcon sx={{ minWidth: '36px' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: '14px' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        Open Drawer
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
