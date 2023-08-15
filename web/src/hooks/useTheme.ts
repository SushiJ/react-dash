import { useContext } from "react";
import { ModeContext } from "../context/Mode";

export const useMode = () => useContext(ModeContext);
