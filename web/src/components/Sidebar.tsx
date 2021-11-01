import { Forum, Person } from "@mui/icons-material";
import { Tab, Tabs, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import ContactModal from "./ContactModal";
import Contacts from "./Contacts";
import ConversationModal from "./ConversationModal";
import Conversations from "./Conversations";
import TabPanel from "./TabPanel";

interface SidebarProps {
  id: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Sidebar = ({ id }: SidebarProps) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "80vh",
        boxShadow: 2,
        borderRadius: 1,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="對話"
            icon={<Forum />}
            iconPosition="end"
            {...a11yProps(0)}
          />
          <Tab
            label="聯絡人"
            icon={<Person />}
            iconPosition="end"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} handleOpen={handleOpen}>
          <Conversations />
          <ConversationModal open={modalOpen} handleClose={handleClose} />
        </TabPanel>

        <TabPanel value={value} index={1} handleOpen={handleOpen}>
          <Contacts />
          <ContactModal open={modalOpen} handleClose={handleClose} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};

export default Sidebar;
