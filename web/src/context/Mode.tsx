import { createContext, useContext, useState } from "react";

export type ModeContext = {
  mode: "dark" | "light";
  setMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
};

export const ModeContext = createContext<ModeContext | null>(null);
ModeContext.displayName = "Theme Context";

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    return;
  }
  return context;
};
