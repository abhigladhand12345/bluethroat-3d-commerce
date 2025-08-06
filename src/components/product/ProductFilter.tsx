import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === category ? "accent" : "outline"}
            onClick={() => onCategoryChange(category)}
            className="capitalize"
          >
            {category === 'all' ? 'All Products' : category}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductFilter;