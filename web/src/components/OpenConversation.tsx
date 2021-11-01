import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { Send } from "@mui/icons-material";
import { useConversations } from "@/contexts/ConversationsProvider";
import { useCallback, useState } from "react";
import CustomInput from "./CustomInput";

const OpenConversation = () => {
  const [text, setText] = useState("");
  const setRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations()!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };

  return (
    <Box
      sx={{
        height: "80vh",
        width: "600px",
        boxShadow: 2,
        borderRadius: 1,
        flexGrow: 1,
        padding: "10px",
      }}
      display="flex"
      flexDirection="column"
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Box
          height="100"
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="end"
          p="20px"
        >
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1;
            return (
              <Box
                ref={lastMessage ? setRef : null}
                display="flex"
                flexDirection="column"
                my={1}
                key={index}
                alignSelf={`${message.fromMe ? "end" : "start"}`}
                alignItems={`${message.fromMe ? "end" : "start"}`}
              >
                <Box
                  borderRadius={1}
                  px={2}
                  py={1}
                  color={`${message.fromMe ? "white" : "black"}`}
                  bgcolor={`${message.fromMe ? "steelblue" : "lightgray"}`}
                >
                  {message.text}
                </Box>
                <Box
                  borderRadius={1}
                  fontWeight="200"
                  fontSize="0.8rem"
                  textAlign={`${message.fromMe ? "right" : "left"}`}
                >
                  {message.fromMe ? "你" : message.senderName}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <CustomInput
          placeholder="說點什麼吧..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton sx={{ marginLeft: "5px" }} color="info" type="submit">
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default OpenConversation;
