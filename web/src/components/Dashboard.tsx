import { useConversations } from "@/contexts/ConversationsProvider";
import { Person } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

interface DashboardProps {
  id: string;
}

const Dashboard = ({ id }: DashboardProps) => {
  const { selectedConversation } = useConversations()!;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
      }}
    >
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
      <Chip
        icon={<Person />}
        label={id}
        color="info"
        variant="outlined"
        sx={{ position: "absolute", left: "20px", bottom: "20px" }}
      />
    </Box>
  );
};

export default Dashboard;
