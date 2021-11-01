import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useContacts } from "@/contexts/ContactsProvider";

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
const ContactModal = ({ open, handleClose }: ModalProps) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const { createContact } = useContacts()!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createContact(id, name);
    handleClose();
    setName("");
    setId("");
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
            新增聯絡人
          </Typography>
          <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="userId" color="info">
                輸入使用者 ID
              </InputLabel>
              <Input
                id="userId"
                required
                color="info"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </FormControl>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              <InputLabel htmlFor="userId" color="info">
                輸入使用者名稱
              </InputLabel>
              <Input
                id="username"
                required
                color="info"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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

export default ContactModal;
