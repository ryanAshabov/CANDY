import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { useThemeColor } from '@/hooks/useColorScheme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const white = useThemeColor({}, 'white');
  const danger = useThemeColor({}, 'error');
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');

  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...getButtonSizeStyle(),
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, backgroundColor: primary };
      case 'secondary':
        return { ...baseStyle, backgroundColor: secondary };
      case 'outline':
        return { ...baseStyle, backgroundColor: 'transparent', borderWidth: 1, borderColor: border };
      case 'danger':
        return { ...baseStyle, backgroundColor: danger };
      default:
        return { ...baseStyle, backgroundColor: primary };
    }
  };

  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...getTextSizeStyle(),
    };

    switch (variant) {
      case 'outline':
        return { ...baseStyle, color: text };
      default:
        return { ...baseStyle, color: white };
    }
  };

  const getButtonSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 20 };
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'large':
        return { fontSize: 18 };
      default:
        return { fontSize: 16 };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? primary : white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});