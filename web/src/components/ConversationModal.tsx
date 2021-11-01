import {
  Backdrop,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useContacts } from "@/contexts/ContactsProvider";
import { useConversations } from "@/contexts/ConversationsProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const ConversationModal = ({ open, handleClose }: ModalProps) => {
  const [selectedContactIds, setSelectedContactIds] = useState<
    string[] | undefined
  >([]);
  const { contacts } = useContacts()!;
  const { createConversation } = useConversations()!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConversation(selectedContactIds!);
    handleClose();
    setSelectedContactIds([]);
  };

  const handleChange = (contactId: string) => {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds!.includes(contactId)) {
        return prevSelectedContactIds!.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds!, contactId];
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" fontWeight="600">
            新增對話
          </Typography>
          <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormGroup>
                {contacts.map((contact) => (
                  <FormControlLabel
                    key={contact.id}
                    control={
                      <Checkbox
                        value={selectedContactIds?.includes(contact.id)}
                        onChange={() => handleChange(contact.id)}
                        name={contact.name}
                      />
                    }
                    label={contact.name}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <Button variant="contained" color="success" type="submit">
                新增
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConversationModal;
