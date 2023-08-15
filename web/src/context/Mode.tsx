import { createContext, useState } from "react";

export type ModeContext = {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
};

const defaultValue = {
  mode: "dark",
  setMode: () => {},
};

export const ModeContext = createContext<ModeContext>(defaultValue);

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<string>("dark");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
