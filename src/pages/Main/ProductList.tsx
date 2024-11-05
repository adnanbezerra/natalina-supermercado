import React, { useState } from "react";
import "./ProductList.css";
import { IProduct } from "../../interfaces/product";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([
        { id: 1, name: "Arroz Tio João", price: 5, promotion: false, image:"/imagens/arroz.png"},
        { id: 2, name: "Macarrão Vitarella", price: 4, promotion: false, image:"/imagens/macarrão.png" },
        { id: 3, name: "Chocolate Nestlé", price: 10, promotion: false, image:"/imagens/chocolate.png" },
        { id: 4, name: "Água Mineral", price: 1.50, promotion: false, image:"/imagens/agua.png" },
        { id: 5, name: "Cream Cracker", price: 10, promotion: false, image:"imagens/biscoito.png" },
        { id: 6, name: "Farinha de Trigo", price: 8, promotion: false, image:"imagens/farinha.png" },
    ]);

    const handleEditProduct = (id: number) => {

                      }

    return (
        <div className="product-list">
            <h1>Lista de Produtos</h1>
            {products.map((product) => (
                <div className="product-item"
                    key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>Preço: R${product.price} <br />
                    Promoção: {product.promotion ? "Sim" : "Não"}</p>
                    <button onClick={() => handleEditProduct(product.id)}>
                     Editar produto
                    </button>
                </div>
            ))}
        </div>
    );
};

<footer id="footer">
    <p>�� 2022 Natalina Supermercado. Todos os direitos reservados.</p>
</footer>

export default ProductList;
