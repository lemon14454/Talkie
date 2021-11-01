import Switch from "@/components/Switch";
import Login from "@/components/Login";
import { Container } from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage";
import Dashboard from "@/components/Dashboard";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

const App = () => {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Switch />
      {id ? dashboard : <Login onIdSubmit={setId} />}
    </Container>
  );
};

export default App;
