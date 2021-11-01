import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box } from "@mui/system";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

interface LoginProps {
  onIdSubmit: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ onIdSubmit }: LoginProps) => {
  const [id, setId] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onIdSubmit(id);
  };

  const createNewId = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: "30px 20px",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
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
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box mt="10px">
        <Button
          variant="contained"
          color="info"
          endIcon={<SendIcon />}
          type="submit"
        >
          登入
        </Button>
        <Button
          variant="contained"
          color="success"
          endIcon={<GroupAddIcon />}
          onClick={createNewId}
        >
          新增使用者
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
