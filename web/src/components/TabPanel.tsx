import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  handleOpen: () => void;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, handleOpen, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            endIcon={<Add />}
            fullWidth
            color="success"
            sx={{ marginBottom: "20px" }}
            onClick={handleOpen}
          >
            新增
          </Button>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
