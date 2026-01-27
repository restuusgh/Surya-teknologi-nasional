import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addProduct = async (formData) => {
    await api.post("/products", formData); // ⬅️ JANGAN HEADER
    fetchProducts();
  };

  const updateProduct = async (id, formData) => {
    await api.put(`/products/${id}`, formData);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
