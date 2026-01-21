import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addProduct = async (data) => {
    await api.post("/products", {
      ...data,
      price: Number(data.price), 
    });
    fetchProducts();
  };

  const updateProduct = async (id, data) => {
    await api.put(`/products/${id}`, {
      ...data,
      price: Number(data.price),
    });
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
