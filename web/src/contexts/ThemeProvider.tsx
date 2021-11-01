import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, FC, useMemo, useState } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ToggleColorMode: FC = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              body {
                transition:all 0.3s linear;
              } 
            `,
          },
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
