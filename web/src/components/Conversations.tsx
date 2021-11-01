import { useConversations } from "@/contexts/ConversationsProvider";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations()!;

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
        {conversations &&
          conversations.map((conversation, index: number) => (
            <ListItemButton
              key={index}
              selected={conversation.selected}
              onClick={() => selectConversationIndex(index)}
            >
              <ListItemText
                primary={conversation.recipients.map((r) => r.name).join(", ")}
              />
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
};

export default Conversations;
