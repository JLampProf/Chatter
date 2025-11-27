import { useState, createContext, useContext } from "react";

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const StateContext = ({ children }) => {
  const [number, setNumber] = useState(0);

  const values = { number, setNumber };

  return <GlobalStateContext value={values}>{children}</GlobalStateContext>;
};

export default StateContext;
