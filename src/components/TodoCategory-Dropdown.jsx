import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios'
  
const TodoCategory = () => {
  const [category, setCategory] = useState([])
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        </Text>
      );
    }
    return null;
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://api.kontenbase.com/query/api/v1/e47c10a1-ec97-4a84-988c-3c146b726ef0/Category"
      );
      setCategory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory()
  },[])
  return (
    <View style={{flexDirection: 'row'}}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={ category.map((data) => (
          { label: data.category, value: data._id }
        ))}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Category' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

  export default TodoCategory;

  const styles = StyleSheet.create({
    dropdown: {
      display: 'flex',
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width: 80,
      marginRight: 14,
    },
    placeholderStyle: {
      fontSize: 12,
      color: 'grey',
    },
    selectedTextStyle: {
      fontSize: 12,
    },
    iconStyle: {
      width: 10,
      height: 20,
    },
  });