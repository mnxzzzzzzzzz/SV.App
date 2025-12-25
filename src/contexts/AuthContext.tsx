import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useRouter } from "expo-router";

type UserStatus = "waitlisted" | "approved";
type AuthContextType = {
  isAuthenticated: boolean;
  userStatus: UserStatus;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  checkAccess: () => Promise<boolean>;
  approveAccess: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStatus, setUserStatus] = useState<UserStatus>("waitlisted");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const checkAccess = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const hasAccess = Math.random() > 0.3;
    if (hasAccess) {
      setUserStatus("approved");
      return true;
    }
    return false;
  };

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserStatus("approved");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserStatus("waitlisted");
    setUserEmail(null);
  };

  const approveAccess = () => {
    setUserStatus("approved");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userStatus, 
        userEmail,
        login, 
        logout, 
        checkAccess,
        approveAccess 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
