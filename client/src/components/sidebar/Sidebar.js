import { Box, Drawer, IconButton, styled, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import PriceSlider from "./PriceSlider";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>Apply Filter:</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <PriceSlider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
