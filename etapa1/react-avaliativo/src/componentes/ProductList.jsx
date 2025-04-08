import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ name }) => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingPrice, setEditingPrice] = useState("");

    useEffect(() => {
        const savedProducts = localStorage.getItem("produtos");
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("produtos", JSON.stringify(products));
    }, [products]);

    const addProduct = () => {
        if (productName.trim() === "" || productPrice === "") return;

        setProducts([
            ...products,
            {
                id: Date.now(),
                name: productName,
                price: parseFloat(productPrice),
            },
        ]);

        setProductName("");
        setProductPrice("");
    };

    const startEditing = (id, name, price) => {
        setEditingId(id);
        setEditingName(name);
        setEditingPrice(price);
    };

    const saveEdit = () => {
        setProducts(
            products.map((product) =>
                product.id === editingId
                    ? { ...product, name: editingName, price: parseFloat(editingPrice) }
                    : product
            )
        );
        cancelEditing();
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingName("");
        setEditingPrice("");
    };

    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Produtos {name}</h2>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Nome do produto"
            />
            <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Preço"
            />
            <button onClick={addProduct}>Adicionar produto</button>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map((product) => (
                    <li key={product.id} style={{ margin: "10px 0" }}>
                        {editingId === product.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editingPrice}
                                    onChange={(e) => setEditingPrice(e.target.value)}
                                />
                                <button onClick={saveEdit}>Salvar</button>
                                <a href="#" onClick={cancelEditing}>Cancelar</a>
                            </>
                        ) : (
                            <>
                                <ProductCard
                                    product={product}
                                    onAddToCart={() => handleAddToCart(product)}
                                />
                                <button onClick={() => startEditing(product.id, product.name, product.price)}>
                                    Editar
                                </button>
                                <button onClick={() => deleteProduct(product.id)}>Excluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
