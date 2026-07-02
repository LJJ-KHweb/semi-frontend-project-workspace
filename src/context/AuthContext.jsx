import { useState, createContext, useContext } from "react";
import axios from "axios";

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
    // 원래는 RefreshToken을 보내서 refreshToken값을 DB에서 DELETE해야함
    axios.get(
      `http://localhost/api/auth/logout?id=${localStorage.getItem("userId")}`,
    );
    ["token", "refreshToken", "userId", "userName", "role"].forEach((k) =>
      localStorage.removeItem(k),
    );
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
