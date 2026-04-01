import { create } from "zustand";

const useProductStore = create((set) => ({
  search: "",
  setSearch: (value) => set({search: value}),
}));

export default useProductStore;
