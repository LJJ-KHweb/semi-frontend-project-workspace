import { useState, createContext, useContext } from "react";
import axios from "axios";
import api from "../api/axios";

// 보관함 만들기
const AuthContext = createContext(null);

// 보관함에 값 넣고 나눠주는 역할
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
    };
  });

  const login = (data) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("role", data.role);

    setUser({
      userId: data.userId,
      userName: data.userName,
      role: data.role,
    });
  };

  const logout = () => {
    api
      .delete("/auth/logout", {
        data: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      })
      .then((result) => {
        if (result.status === 200) {
          console.log("들어왔음22");
          ["token", "refreshToken", "userId", "userName", "role"].forEach((k) =>
            localStorage.removeItem(k),
          );
        }
      });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
