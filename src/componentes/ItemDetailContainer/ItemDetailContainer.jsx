import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utilidades/firebase';

// Detecta el modelo y retorna el rango de talles
function getSizeRangeForModel(product) {
  const name = (product?.name || '').toLowerCase();
  const candidates = [
    { keys: ['112', '858'], range: [38, 46] },
    { keys: ['m1', 'm2'], range: [36, 41] },
    { keys: ['850'], range: [34, 50] },
    { keys: ['613', '910', '650'], range: [39, 46] },
  ];
  for (const c of candidates) {
    if (c.keys.some(k => name.includes(k))) return c.range;
  }
  return null;
}

function SizeTable({ product }) {
  const range = getSizeRangeForModel(product);
  if (!range) {
    return <p>Tabla de talles no disponible para este modelo.</p>;
  }
  const [min, max] = range;
  const sizes = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <div style={{ marginTop: '16px' }}>
      <h3>Tabla de talles</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {sizes.map(s => (
          <span key={s} style={{ border: '1px solid #ccc', borderRadius: 4, padding: '6px 10px' }}>{s}</span>
        ))}
      </div>
      <p style={{ marginTop: 8, color: '#666' }}>Rango: {min} al {max}</p>
    </div>
  );
}

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, 'products', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          setError('Producto no encontrado');
        }
      } catch (e) {
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div style={{ padding: 16 }}>
      <h1>{product.name || 'Producto'}</h1>
      {product.image && (
        <img src={product.image} alt={product.name} style={{ maxWidth: 300, borderRadius: 6 }} />
      )}
      <p style={{ marginTop: 8 }}>Precio: ${product.price ? product.price.toLocaleString() : 'No disponible'}</p>
      {(() => {
        const name = (product?.name || '').toLowerCase();
        const hide = name.includes('botgam') || name.includes('articulo 98') || name.includes('bot');
        return hide ? null : <p>Stock: {product.stock ?? '—'}</p>;
      })()}
      <p>Colores: {product.colors?.join(', ') || '—'}</p>

      <SizeTable product={product} />
    </div>
  );
}

export default ItemDetailContainer;