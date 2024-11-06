import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../services/product/fetch-product";
import { IProduct } from "../../interfaces/product";

// Função para salvar o produto no LocalStorage
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
  const [discount, setDiscount] = useState<number>(0); // Campo para o desconto da promoção
  const [description, setDescription] = useState<string>(""); // Campo para a descrição da promoção
  const [promotionDetailsVisible, setPromotionDetailsVisible] = useState(false); // Estado para exibir os detalhes da promoção

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
    if (product) {
      alert(`${product.name} removido com sucesso!`);
      setProduct(undefined);
    }
  };

  const togglePromotion = async () => {
    if (product) {
      const updatedProduct = {
        ...product,
        promotion: !product.promotion,
        promotionDetails: product.promotion
          ? undefined
          : product.promotionDetails, // Limpa os detalhes de promoção se for removida
        price: product.promotion
          ? product.price /
            (1 - (product.promotionDetails?.discount || 0) / 100)
          : product.price, // Restaura o preço original
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
        price: product.price * (1 - discount / 100), // Atualiza o preço com o desconto
        promotionDetails: {
          discount,
          description,
        }, // Salva o desconto e a descrição
      };
      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        setPromotionMode(false); // Fechar o modal de promoção após salvar
        alert("Promoção cadastrada com sucesso!");
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
        price: product.price * (1 - discount / 100), // Atualiza o preço com o novo desconto
      };
      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        setPromotionMode(false); // Fechar o modal de promoção após atualizar
        alert("Promoção atualizada com sucesso!");
      });
    }
  };

  const handleRemovePromotion = () => {
    if (product && product.promotion) {
      const updatedProduct = {
        ...product,
        promotion: false, // Desativa a promoção
        promotionDetails: {
          discount: product.promotionDetails?.discount || 0,
          description: product.promotionDetails?.description || "",
        }, // Salva os detalhes para possibilitar a recuperação
        price:
          product.price / (1 - (product.promotionDetails?.discount || 0) / 100), // Restaura o preço original
      };
      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        alert("Promoção removida com sucesso!");
        setPromotionMode(false); // Fechar o modal de promoção após remover
      });
    }
  };

  const handleRecoverPromotion = () => {
    if (product && product.promotionDetails) {
      const { discount, description } = product.promotionDetails;
      const updatedProduct = {
        ...product,
        promotion: true, // Restaura a promoção
        price: product.price * (1 - discount / 100), // Aplica o desconto novamente ao preço
        promotionDetails: {
          discount,
          description,
        },
      };

      saveProduct(updatedProduct).then((savedProduct) => {
        setProduct(savedProduct);
        alert("Promoção recuperada com sucesso!");
      });
    } else {
      alert("Nenhuma promoção salva para este produto.");
    }
  };

  const handleViewPromotion = () => {
    setPromotionDetailsVisible(!promotionDetailsVisible); // Alterna a visibilidade dos detalhes da promoção
  };

  return (
    <div className="container">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>Preço: ${product.price.toFixed(2)}</p>

          {/* Toggling Promotion Status */}
          <button onClick={togglePromotion}>
            {product.promotion ? "Remover Promoção" : "Aplicar Promoção"}
          </button>

          <button onClick={handleRemoveProduct}>Remover Produto</button>

          {/* Botão para editar a promoção */}
          <button onClick={() => setPromotionMode(!promotionMode)}>
            {promotionMode ? "Cancelar Edição de Promoção" : "Editar Promoção"}
          </button>

          {/* Formulário de promoção */}
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

          {/* Botão para mostrar/ocultar os detalhes da promoção */}
          <button onClick={handleViewPromotion}>
            {promotionDetailsVisible
              ? "Ocultar Detalhes da Promoção"
              : "Ver Promoção"}
          </button>

          {/* Exibe os detalhes da promoção em uma caixa de texto (textarea) */}
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

          {/* Botão para editar o produto */}
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancelar" : "Editar Produto"}
          </button>

          {/* Formulário de edição do produto */}
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

          {/* Botão para recuperar a promoção */}
          <button onClick={handleRecoverPromotion}>Recuperar Promoção</button>
        </>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
};

export default ProductPage;
