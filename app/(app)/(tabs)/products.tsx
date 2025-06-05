import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import AppHeader from '@/components/AppHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ProductModal from '@/components/ui/ProductModal';
import { CirclePlus as PlusCircle, Search, CreditCard as Edit, Trash2 } from 'lucide-react-native';

// Sample data for demonstration
const sampleProducts = [
  { 
    id: '1', 
    name: 'Chocolate Bar', 
    price: 2.99, 
    inventory: 120, 
    category: 'Chocolate',
    description: 'Rich dark chocolate bar made with premium cocoa beans.',
    image_url: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg'
  },
  { 
    id: '2', 
    name: 'Gummy Bears', 
    price: 3.49, 
    inventory: 85, 
    category: 'Gummies',
    description: 'Colorful and chewy gummy bears in assorted fruit flavors.',
    image_url: 'https://images.pexels.com/photos/55825/gold-bear-gummi-bears-bear-yellow-55825.jpeg'
  },
  { 
    id: '3', 
    name: 'Lollipops', 
    price: 1.25, 
    inventory: 200, 
    category: 'Hard Candy',
    description: 'Classic swirl lollipops in various flavors.',
    image_url: 'https://images.pexels.com/photos/90919/pexels-photo-90919.jpeg'
  },
  { 
    id: '4', 
    name: 'Sour Strips', 
    price: 2.75, 
    inventory: 65, 
    category: 'Sour Candy',
    description: 'Tangy and sweet sour strips that pack a punch.',
    image_url: 'https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg'
  },
  { 
    id: '5', 
    name: 'Mint Chocolates', 
    price: 4.99, 
    inventory: 40, 
    category: 'Chocolate',
    description: 'Refreshing mint-filled chocolate truffles.',
    image_url: 'https://images.pexels.com/photos/1058434/pexels-photo-1058434.jpeg'
  },
];

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof sampleProducts[0] | null>(null);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({}, 'gray');
  const borderColor = useThemeColor({}, 'border');
  const primary = useThemeColor({}, 'primary');
  const error = useThemeColor({}, 'error');
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(sampleProducts);
    } else {
      const filtered = sampleProducts.filter(
        product => 
          product.name.toLowerCase().includes(text.toLowerCase()) ||
          product.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: typeof sampleProducts[0]) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (product: typeof sampleProducts[0]) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete ${product.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement actual delete logic
            const updatedProducts = sampleProducts.filter(p => p.id !== product.id);
            setFilteredProducts(updatedProducts);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSaveProduct = (productData: {
    name: string;
    description: string;
    price: number;
    inventory: number;
    category: string;
    image_url: string;
  }) => {
    if (selectedProduct) {
      // Edit existing product
      const updatedProducts = sampleProducts.map(p =>
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      );
      setFilteredProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
      };
      setFilteredProducts([newProduct, ...sampleProducts]);
    }
    setIsModalVisible(false);
  };
  
  const renderProductItem = ({ item }: { item: typeof sampleProducts[0] }) => (
    <Card style={styles.productCard}>
      <View style={styles.productContent}>
        {item.image_url && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item.image_url }} 
              style={styles.productImage}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.productCategory, { color: subtitleColor }]}>{item.category}</Text>
          
          <View style={styles.productDetails}>
            <Text style={[styles.productPrice, { color: primary }]}>
              ${item.price.toFixed(2)}
            </Text>
            <Text style={[styles.productInventory, { color: subtitleColor }]}>
              Stock: {item.inventory} units
            </Text>
          </View>
        </View>
        
        <View style={styles.productActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { borderColor }]}
            onPress={() => handleEditProduct(item)}
          >
            <Edit size={16} color={textColor} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { borderColor }]}
            onPress={() => handleDeleteProduct(item)}
          >
            <Trash2 size={16} color={error} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppHeader
        title="Product Management"
        subtitle="Manage your inventory of candies and snacks."
        rightComponent={
          <Button
            title="Add New Product"
            size="small"
            leftIcon={<PlusCircle size={16} color="white" />}
            onPress={handleAddProduct}
          />
        }
      />
      
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          containerStyle={styles.searchInput}
          leftIcon={<Search size={18} color={subtitleColor} />}
        />
      </View>
      
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: textColor }]}>
              No products found.
            </Text>
          </View>
        }
      />

      <ProductModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveProduct}
        initialData={selectedProduct || undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchInput: {
    marginBottom: 0,
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    marginBottom: 12,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
    marginRight: 16,
  },
  productInventory: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  productActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});