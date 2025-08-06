import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isLiked ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-accent/30"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            />

            {/* Action Buttons */}
            <motion.div
              className="absolute top-4 right-4 flex flex-col space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="glass"
                size="icon"
                className="w-10 h-10"
                onClick={handleLike}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                  }`}
                />
              </Button>
              <Button
                variant="glass"
                size="icon"
                className="w-10 h-10"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </motion.div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-full text-sm">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Quick Add Button */}
            <motion.div
              className="absolute bottom-4 left-4 right-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button
                variant="cta"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="mb-2">
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">
                ${product.price}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="text-accent hover:text-accent-foreground hover:bg-accent"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;