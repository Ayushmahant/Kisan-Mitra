// components/CustomInput.js
import React from 'react';
import { View, TextInput } from 'react-native';
import styles from '../styles';

const CustomInput = ({ placeholder, value, onChangeText, ...props }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#95A5A6"
      {...props}
    />
  </View>
);

export default CustomInput;
