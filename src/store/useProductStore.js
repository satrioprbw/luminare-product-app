import { create } from "zustand";

const useProductStore = create((set) => ({
  search: "",
  products: [],
  setProducts: (products) => set({products}),
  addProduct: (product) => set((state) => ({
    products: [...state.products, {...product, id: Date.now()}]
  })),
  setSearch: (value) => set({search: value}),
}));

export default useProductStore;
