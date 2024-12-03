import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { IProduct } from "../../interfaces/product";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../services/product/fetch-products";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetchProducts().then((products) => {
            if (products) {
                setProducts(products);
            }
        });
    }, []);

    console.log(products);

    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState<IProduct>({
        name: "",
        price: 0,
        promotion: false,
        image: {
            base64Image: "",
            contentType: "",
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        // setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({
            name: "",
            price: 0,
            promotion: false,
            image: {
                base64Image: "",
                contentType: "",
            },
        });
    };

    const handleEditProduct = (_id?: number) => {
        navigate(`/product/${_id}`);
    };

    return (
        <div className="product-list">
            <div className="new-product">
                <h2>Cadastrar Novo Produto</h2>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Nome do Produto"
                />
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="Preço"
                />
                <input
                    type="text"
                    name="image"
                    // value={newProduct.image}
                    onChange={handleInputChange}
                    placeholder="URL da Imagem"
                />
                <button onClick={handleAddProduct}>Adicionar Produto</button>
            </div>

            <h1>Lista de Produtos</h1>
            {products.map((product) => {
                const imgSource = `data:${product.image.contentType};base64,${product.image.base64Image}`;

                return (
                    <div className="product-item" key={product._id}>
                        <img src={imgSource} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>
                            Preço: R${product.price} <br />
                            Promoção: {product.promotion ? "Sim" : "Não"}
                        </p>
                        <button onClick={() => handleEditProduct(product._id)}>
                            Editar produto
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
