import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { User } from "../types";

interface Props {
  user: User 
  setUser: (user: User | null) => void;
}

export const useUser = (): Props => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  const { user, setUser } = context
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  return {
    user,
    setUser
  }
};
