import React, { createContext, useState } from "react";

interface ProviderProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AuthContext = createContext<ProviderProps>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token") || null
  );

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
