import ProductCard from './ProductCard'

export default function ProductGrid({ 
  products, 
  onAddToCart, 
  onToggleFavorite, 
  isFavorite 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  )
}
