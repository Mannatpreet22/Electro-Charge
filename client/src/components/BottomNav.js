import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { AddLocationAlt, EvStation } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Rooms from "./rooms/Rooms";
import AddRoom from "./addRoom/AddRoom";
import Protected from "./protected/Protected";
import { getRooms } from "../actions/room";
import { useValue } from "../context/ContextProvider";

const BottomNav = () => {
  const { dispatch } = useValue();
  const [value, setValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    getRooms(dispatch);
  }, [value]);
  return (
    <Box ref={ref}>
      {
        {
          0: <Rooms />,
          1: (
            <Protected>
              <AddRoom setPage={setValue} />
            </Protected>
          ),
        }[value]
      }
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Stations" icon={<EvStation />} />
          <BottomNavigationAction label="Add" icon={<AddLocationAlt />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
