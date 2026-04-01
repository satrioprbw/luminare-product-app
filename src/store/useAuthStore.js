import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  login: (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.accessToken);
    set({ user: data, token: data.accessToken });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;
