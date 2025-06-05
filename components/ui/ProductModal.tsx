import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';
import Button from './Button';
import { X, ImagePlus } from 'lucide-react-native';

type ProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (product: {
    name: string;
    description: string;
    price: number;
    inventory: number;
    category: string;
    image_url: string;
  }) => void;
  initialData?: {
    name: string;
    description: string;
    price: number;
    inventory: number;
    category: string;
    image_url: string;
  };
};

export default function ProductModal({ isVisible, onClose, onSave, initialData }: ProductModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [inventory, setInventory] = useState(initialData?.inventory?.toString() || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [error, setError] = useState<string | null>(null);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const subtitleColor = useThemeColor({}, 'gray');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setInventory(initialData.inventory.toString());
      setCategory(initialData.category);
      setImageUrl(initialData.image_url);
    }
  }, [initialData]);

  const handleSave = () => {
    setError(null);

    if (!name.trim()) {
      setError('Product name is required');
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (!inventory || isNaN(Number(inventory)) || Number(inventory) < 0) {
      setError('Please enter a valid inventory amount');
      return;
    }

    if (!category.trim()) {
      setError('Category is required');
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      inventory: Number(inventory),
      category: category.trim(),
      image_url: imageUrl.trim(),
    });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setInventory('');
    setCategory('');
    setImageUrl('');
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: textColor }]}>
              {initialData ? 'Edit Product' : 'Add New Product'}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={textColor} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>Name</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor }]}
                value={name}
                onChangeText={setName}
                placeholder="Product name"
                placeholderTextColor={subtitleColor}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: textColor, borderColor }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Product description"
                placeholderTextColor={subtitleColor}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, { color: textColor }]}>Price ($)</Text>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor }]}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  placeholderTextColor={subtitleColor}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: textColor }]}>Inventory</Text>
                <TextInput
                  style={[styles.input, { color: textColor, borderColor }]}
                  value={inventory}
                  onChangeText={setInventory}
                  placeholder="0"
                  placeholderTextColor={subtitleColor}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>Category</Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor }]}
                value={category}
                onChangeText={setCategory}
                placeholder="Product category"
                placeholderTextColor={subtitleColor}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>Image URL</Text>
              <View style={styles.imageUrlContainer}>
                <TextInput
                  style={[styles.input, styles.imageUrlInput, { color: textColor, borderColor }]}
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  placeholder="https://example.com/image.jpg"
                  placeholderTextColor={subtitleColor}
                />
                <TouchableOpacity 
                  style={[styles.imageButton, { borderColor }]}
                  onPress={() => {/* TODO: Implement image picker */}}
                >
                  <ImagePlus size={20} color={textColor} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={handleClose}
                style={styles.button}
              />
              <Button
                title={initialData ? 'Save Changes' : 'Add Product'}
                onPress={handleSave}
                style={styles.button}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  imageUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageUrlInput: {
    flex: 1,
    marginRight: 8,
  },
  imageButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  button: {
    marginLeft: 12,
    minWidth: 120,
  },
});