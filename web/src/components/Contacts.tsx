import { useContacts } from "@/contexts/ContactsProvider";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const Contacts = () => {
  const { contacts } = useContacts()!;

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        transition: "all .3s linear",
      }}
    >
      <List component="nav" aria-label="secondary mailbox folder">
        {contacts &&
          contacts.map((contact, index: number) => (
            <ListItemButton
              key={contact.id}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemText primary={contact.name} />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
};

export default Contacts;
