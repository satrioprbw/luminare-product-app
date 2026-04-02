import { create } from "zustand";

const useProductStore = create((set) => ({
  search: "",
  products: [],
  setProducts: (products) => set({products}),
  addProduct: (product) => set((state) => ({
    products: [...state.products, {...product, id: Date.now()}]
  })),
  editProduct: (id, editedProduct) => set((state) => ({
    products: state.products.map((product) => product.id === id ? {...product, ...editedProduct} : product)
  })),
  setSearch: (value) => set({search: value}),
}));

useProductStore.subscribe((state) => console.log("Store updated:", state));

export default useProductStore;
