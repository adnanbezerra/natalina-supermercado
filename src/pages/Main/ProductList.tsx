import React, { useState } from "react";
import "./ProductList.css";
import { IProduct } from "../../interfaces/product";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([
        { id: 1, name: "Arroz Tio João", price: 5, promotion: false, image: "/imagens/arroz.png" },
        { id: 2, name: "Macarrão Vitarella", price: 4, promotion: false, image: "/imagens/macarrão.png" },
        { id: 3, name: "Chocolate Nestlé", price: 10, promotion: false, image: "/imagens/chocolate.png" },
        { id: 4, name: "Água Mineral", price: 1.50, promotion: false, image: "/imagens/agua.png" },
        { id: 5, name: "Cream Cracker", price: 10, promotion: false, image: "imagens/biscoito.png" },
        { id: 6, name: "Farinha de Trigo", price: 8, promotion: false, image: "imagens/farinha.png" },
    ]);

    const [newProduct, setNewProduct] = useState<IProduct>({
        id: 0,
        name: "",
        price: 0,
        promotion: false,
        image: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; setNewProduct
            ({ ...newProduct, [name]: value });
    }

    const handleAddProduct = () => {
        setProducts([...products,
        { ...newProduct, id: products.length + 1 }]); setNewProduct({ id: 0, name: "", price: 0, promotion: false, image: "" });
    };

    /*const handleEditProduct = (id: number) => {

                      }
*/
    return (

        <div className="product-list">
            <div className="new-product">
                <h2>Cadastrar Novo Produto</h2> 
                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Nome do Produto" />
                <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Preço" /> 
                <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} placeholder="URL da Imagem" /> 
                <button onClick={handleAddProduct}>Adicionar Produto</button>
            </div>

            
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
            </div>);





};

export default ProductList;
