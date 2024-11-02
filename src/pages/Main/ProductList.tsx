import React, { useState } from "react";
import "./ProductList.css";
import { Main } from "../../interfaces/product";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Main[]>([
        { id: 1, name: "Produto 1", price: 100, promotion: false },
        { id: 2, name: "Produto 2", price: 200, promotion: false },
    ]);

    const handleEditProduct = (id: number) => {
        const newName = prompt("Digite o novo nome do produto:");
        const newPrice = parseFloat(
            prompt("Digite o novo preço do produto:") || "0"
        );
        setProducts(
            products.map((product) =>
                product.id === id
                    ? {
                          ...product,
                          name: newName || product.name,
                          price: newPrice || product.price,
                      }
                    : product
            )
        );
    };

    const handleRemoveProduct = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const togglePromotion = (id: number) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? { ...product, promotion: !product.promotion }
                    : product
            )
        );
    };

    const handleViewDetails = (product: Main) => {
        alert(
            `Detalhes do produto:\nNome: ${product.name}\nPreço: R$${
                product.price
            }\nPromoção: ${product.promotion ? "Sim" : "Não"}`
        );
    };

    return (
        <div>
            <h1>Lista de Produtos</h1>
            {products.map((product) => (
                <div
                    key={product.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 0",
                    }}
                >
                    <h2>{product.name}</h2>
                    <p>Preço: R${product.price}</p>
                    <p>Promoção: {product.promotion ? "Sim" : "Não"}</p>
                    <button onClick={() => handleViewDetails(product)}>
                        Ver Detalhes
                    </button>
                    <button onClick={() => handleEditProduct(product.id)}>
                        Editar
                    </button>
                    <button onClick={() => handleRemoveProduct(product.id)}>
                        Remover
                    </button>
                    <button onClick={() => togglePromotion(product.id)}>
                        {product.promotion
                            ? "Remover Promoção"
                            : "Aplicar Promoção"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
