import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 5)); // Show only first 5 results
  }, [query]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center p-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground mr-3" />
                <Input
                  placeholder="Search for clothes, brands, categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 border-none bg-transparent focus:ring-0"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="ml-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search Results */}
              {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.map((product) => (
                    <motion.div
                      key={product.id}
                      className="p-4 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                      whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                      onClick={() => handleProductClick(Number(product.id))}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{product.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                          <p className="text-sm font-medium text-accent">${product.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {query.trim() !== '' && results.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products found for "{query}"</p>
                  <p className="text-sm mt-2">Try different keywords or browse our categories</p>
                </div>
              )}

              {/* Quick Categories */}
              {query.trim() === '' && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['t-shirts', 'jeans', 'jackets', 'shoes', 'hoodies'].map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(category)}
                        className="capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchComponent;