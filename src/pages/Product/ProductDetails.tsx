import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services/product/fetch-product";
import { IProduct } from "../../interfaces/product";
import { toast } from 'react-toastify';
import "./Productt.css";
import { removeProduct } from '../../services/product/remove-product';


export async function saveDemoProducts(products: IProduct[]) {
  const local = localStorage.getItem("products");

  if (!local) {
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    const existingProducts: IProduct[] = JSON.parse(local);
    const updatedProducts = existingProducts.map((existingProduct) => {
      const updatedProduct = products.find((p) => p.id === existingProduct.id);
      return updatedProduct ? updatedProduct : existingProduct;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }
}

const saveProduct = async (product: IProduct) => {
  console.log("Produto salvo:", product);
  return product;
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [promotionMode, setPromotionMode] = useState(false);
  const [discount, setDiscount] = useState<number>(0); 
  const [description, setDescription] = useState<string>(""); 
  const [promotionDetailsVisible, setPromotionDetailsVisible] = useState(false); 

  useEffect(() => {
    fetchProduct(Number(id)).then((data) => {
      setProduct(data);
    });
  }, [id]);

  const handleEditProduct = async () => {
    if (product) {
      const updatedProduct = {
        ...product,
        name: product.name,
        price: product.price,
      };
      const savedProduct = await saveProduct(updatedProduct);
      setProduct(savedProduct);
    }
  };

  const handleRemoveProduct = async () => {
    const response = await removeProduct(Number(id));

    if (response.isRight && product) {
      toast.success(`${product.name} removido com sucesso!`);
      setProduct(undefined);
    } else {
      toast.error(response.message);
    }
  };

  const togglePromotion = async () => {
    if (product) {
      const updatedProduct = {
        ...product,
        promotion: !product.promotion,
        promotionDetails: product.promotion
          ? undefined
          : product.promotionDetails, 
        price: product.promotion
          ? product.price /
            (1 - (product.promotionDetails?.discount || 0) / 100)
          : product.price, 
      };
      const savedProduct = await saveProduct(updatedProduct);
      setProduct(savedProduct);
    }
  };

  const handleSavePromotion = () => {
    if (product) {
      const updatedProduct = {
        ...product,
        promotion: true,
        price: product.price * (1 - discount / 100), 
        promotionDetails: {
          discount,
          description,
        }, 
      };
      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        setPromotionMode(false); 
        toast.success("Promoção cadastrada com sucesso!");
      });
    }
  };

  const handleUpdatePromotion = () => {
    if (product && product.promotion) {
      const updatedProduct = {
        ...product,
        promotionDetails: {
          discount,
          description,
        },
        price: product.price * (1 - discount / 100), 
      };
      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        setPromotionMode(false); 
        toast.success("Promoção atualizada com sucesso!");
      });
    }
  };

  const handleRemovePromotion = () => {
    if (product && product.promotion) {
      const updatedProduct = {
        ...product,
        promotion: false, 
        promotionDetails: {
          discount: product.promotionDetails?.discount || 0,
          description: product.promotionDetails?.description || "",
        }, 
        price:
          product.price / (1 - (product.promotionDetails?.discount || 0) / 100), 
      };
      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        toast.success("Promoção removida com sucesso!");
        setPromotionMode(false); 
      });
    }
  };

  const handleRecoverPromotion = () => {
    if (product && product.promotionDetails) {
      const { discount, description } = product.promotionDetails;
      const updatedProduct = {
        ...product,
        promotion: true, 
        price: product.price * (1 - discount / 100), 
        promotionDetails: {
          discount,
          description,
        },
      };

      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        toast.success("Promoção recuperada com sucesso!");
      });
    } else {
      toast.error("Nenhuma promoção salva para este produto.");
    }
  };

  const handleViewPromotion = () => {
    setPromotionDetailsVisible(!promotionDetailsVisible); 
  };

  return (
    <div className="container" style={{ height: 'fit-content' }}>
      {product ? (
        <div>
          <h1 style={{ marginTop: "20px" }}>{product.name}</h1>
          <div className='product-info'>
            <div className='product-price'>
              <p><span>Preço</span>: ${product.price.toFixed(2)}</p>
              <p><span>Promoção</span>: {product.promotion ? "Ativa" : "Inativa"}</p>
            </div>
            <img src={`${product.image}`} alt="" />
          </div>

        <div className='options-container'>
          <h2>Opções</h2>
          <button onClick={togglePromotion}>
            {product.promotion ? "Remover Promoção" : "Aplicar Promoção"}
          </button>

          <button onClick={handleRemoveProduct}>Remover Produto</button>

          <button onClick={() => setPromotionMode(!promotionMode)}>
            {promotionMode ? "Cancelar Edição de Promoção" : "Editar Promoção"}
          </button>

          {promotionMode && (
            <div>
              <h2>
                {product.promotion
                  ? "Atualizar Promoção"
                  : "Cadastrar Promoção"}
              </h2>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="Desconto (%)"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da promoção"
              />
              <button
                onClick={
                  product.promotion
                    ? handleUpdatePromotion
                    : handleSavePromotion
                }
              >
                {product.promotion
                  ? "Atualizar Promoção"
                  : "Cadastrar Promoção"}
              </button>
              <button onClick={handleRemovePromotion}>Remover Promoção</button>
            </div>
          )}

          <button onClick={handleViewPromotion}>
            {promotionDetailsVisible
              ? "Ocultar Detalhes da Promoção"
              : "Ver Promoção"}
          </button>

          {promotionDetailsVisible &&
            product.promotion &&
            product.promotionDetails && (
              <textarea
                value={`Desconto: ${product.promotionDetails.discount}%\nDescrição: ${product.promotionDetails.description}`}
                readOnly
                rows={4}
                cols={50}
              />
            )}

          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancelar" : "Editar Produto"}
          </button>

          {editMode && (
            <div>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
              />
              <button onClick={handleEditProduct}>Salvar Alterações</button>
            </div>
          )}

          <button onClick={handleRecoverPromotion}>Recuperar Promoção</button>
          </div>
        </div>
      ) : (
        <div className='container' style={{ height: '100%' }}>
          <div>Produto não encontrado.</div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
