import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import Menu from '@mui/material/Menu';
import './MainList.css';

const MainList = () => {
    const daysRemaining = (purchaseDate) => {
            const arr = purchaseDate.split("/");
            const exp = new Date(arr[2], arr[0] - 1, arr[1]);
            const now = new Date();
            if(purchaseDate === "11/17/2021") {
                console.log(now);
                console.log(exp);
                console.log(arr);
            }
            const difTime = exp.getTime() - now.getTime();
            return Math.round(difTime / (86400000));
    }

    const [list, setList] = useState(() => {
        let arr = [];
        let keys = Object.keys(localStorage);
        for (let x = 0; x < keys.length; x++) {
            let data = localStorage.getItem(keys[x]);
            let difDay = daysRemaining(data);
            let item = {
                'name' : keys[x],
                'purchaseDate' : data,
                'difDay' : difDay
            }
            arr.push(item);
        }
        return arr;
    });

    const remove = (key) => {
        localStorage.removeItem(key);
        for (let x = 0; x < list.length; x++) {
            if (x.name === key) {
                list.splice(x, 1);
            }
        }
        window.location.reload(false)
    }

    const test = () => {
        localStorage.setItem("milk", "03/21/2021");
        localStorage.setItem("juice", "05/21/2020");
        localStorage.setItem("cheese", "12/15/2020");
        localStorage.setItem("yogurt", "11/15/2021");
        localStorage.setItem("ice cream", "11/17/2021");
        document.cookie = "popup=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.reload(false)
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <div>
                <IconButton className={"addBtn"} aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                    <AddCircleRoundedIcon fontSize="large"/>
                </IconButton>
               <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}>
                    <MenuItem onClick={handleClose}>Add item</MenuItem>
                    <MenuItem onClick={handleClose}>Make Shopping List</MenuItem>
                </Menu>
            </div>
            <div>
                {list.map((x) => {
                    return (

                         <Box sx={{ flexGrow: 1, margin: 1 }} className={"boxes"} color="red">
                              
                            <AppBar position="static" className="bar" style={{ background: '#F4E8FE' }}>
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="name">
                                        {x.name}
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} 
                                    className={(x.difDay > 3) ? "good" : (x.difDay > 0) ? "almost" : "spoiled"}>
                                        {x.difDay} {(x.difDay < 0) ? <div><h6>Throw away</h6></div>:<div><h6>days before spoiled</h6></div>}
                                    </Typography>
                                    <IconButton onClick={() => remove(x.name)}>
                                        <RemoveCircleRoundedIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    );
                })}
            </div>
        </div>
    );
}

export default MainList;