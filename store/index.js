
import React, { createContext, useState } from "react";
import DATA from "../json/enneadDATA.json";


export const StoreContext = createContext();

// Make a Provider
export const StoreProvider = ({ children }) => {  
  const [ennead, setEnnead] = useState(DATA.ennead);
  const [kano, setKano] = useState(DATA.kano);
  const store = {
    enneadState: [ennead, setEnnead],
    kanoState: [kano, setKano]
  };
  return (
   <StoreContext.Provider value={store}>
      {children}
   </StoreContext.Provider>
  );
};