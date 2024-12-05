// src/context/RegistrationContext.js
import React, { createContext, useState } from 'react';

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState(null);

  return (
    <RegistrationContext.Provider value={{ registrationData, setRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};
