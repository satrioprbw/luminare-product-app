import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (data) => set({ user: data, token: data.accessToken }),
  logout: () =>
    set({
      user: null,
      token: null,
    }),
}));

export default useAuthStore
