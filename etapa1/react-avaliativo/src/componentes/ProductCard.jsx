// src/components/ProductCard.jsx
import React from "react";
import "./ProductList"



const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <p><strong>Nome:</strong> {product.name}</p>
            <p><strong>Preço:</strong> R$ {product.price}</p>
            <button onClick={onAddToCart}>Adicionar ao Carrinho</button>
        </div>
    );
};

export default ProductCard;

