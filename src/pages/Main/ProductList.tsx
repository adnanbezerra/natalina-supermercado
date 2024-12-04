import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { IProduct } from "../../interfaces/product";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../services/product/fetch-products";
import { postNewProduct } from "../../services/product/post-new-product";
import { toast } from 'react-toastify';

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProducts().then((products) => {
            if (products) {
                setProducts(products);
            }
        });
    }, []);

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    image: {
                        buffer: reader.result as ArrayBuffer,
                        contentType: file.type,
                    },
                }));
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price.toString());
        formData.append("promotion", newProduct.promotion.toString());
        if (newProduct.image.buffer) {
            formData.append(
                "image",
                new Blob([newProduct.image.buffer], {
                    type: newProduct.image.contentType,
                })
            );
        }

        postNewProduct(formData).then((response) => {
            fetchProducts().then((products) => {
                if (products) {
                    setProducts(products);
                }                
            });

            if (response.isRight) {
                toast.success(response.message);
            }
        });
    };

    const handleEditProduct = (_id?: number) => {
        navigate(`/product/${_id}`);
    };

    return (
        <div
            className="product-list"
            style={{
                minHeight: "85%",
            }}
        >
            <div className="new-product">
                <div className="show-form-row">
                    <h1>Lista de Produtos</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{ height: "fit-content" }}
                    >
                        {showForm
                            ? "Esconder formulário"
                            : "Adicionar novo produto"}
                    </button>
                </div>

                <form
                    onSubmit={handleAddProduct}
                    className="new-product-form"
                    style={{ display: showForm ? "block" : "none" }}
                >
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
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        placeholder="Adicione a Imagem"
                    />
                    <button type="submit">Adicionar Produto</button>
                </form>
            </div>

            {products.length === 0 && (
                <div style={{ height: "100%" }}>
                    <p>Nenhum produto cadastrado</p>
                </div>
            )}

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
