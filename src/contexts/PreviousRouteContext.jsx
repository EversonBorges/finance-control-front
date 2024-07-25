import React, { createContext, useContext, useState } from 'react';

const PreviousRouteContext = createContext();

export const PreviousRouteProvider = ({ children }) => {
  const [previousRoute, setPreviousRoute] = useState(null);
  return (
    <PreviousRouteContext.Provider value={{ previousRoute, setPreviousRoute }}>
      {children}
    </PreviousRouteContext.Provider>
  );
};

export const usePreviousRoute = () => {
  return useContext(PreviousRouteContext);
};
