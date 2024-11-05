import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../services/product/fetch-product';
import { IProduct } from '../../interfaces/product';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProduct(Number(productId)).then((data) => {
      setProduct(data);
  });
  }, [productId]);

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>Preço: ${product.price}</p>
          
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancelar' : 'Editar'}
          </button>

          {product.promotion ? (
            <button>Remover Promoção</button>
          ) : (
            <button>Aplicar Promoção</button>
          )}
          
          {editMode && (
            <div>
              <input
                type="text"
                value={product.name}
                onChange={e => setProduct({ ...product, name: e.target.value })}
              />
              <input
                type="number"
                value={product.price}
                onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
              />
              <button>Salvar Alterações</button>
            </div>
          )}
        </>
      ) : (
        <p>Produto não encontrado.</p>
      )}
    </div>
  );
};

export default ProductPage;
