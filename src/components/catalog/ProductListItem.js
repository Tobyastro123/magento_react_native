import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { BASE_MEDIA_URL } from '../../constants'

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { product, setCurrentProductSku, navigate } = this.props;
    setCurrentProductSku(product.sku);
    navigate('product', {
      sku: product.sku,
      title: product.name,
    });
  }

  image = () => {
    let imageUrl = '';
    for (let i = 0; i < this.props.product.custom_attributes.length; i++) {
      const customAttribute = this.props.product.custom_attributes[i];
      if (customAttribute.attribute_code === 'thumbnail') {
        imageUrl = customAttribute.value;
        break;
      }
    }
    return `${BASE_MEDIA_URL}/catalog/product${imageUrl}`.trim();
  }

  render() {
    return (
      <View style={{ borderWidth: 1, borderColor: '#222', flexDirection: 'row', flex: 1, height: 150, justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.onRowPress}>
          <Image
            style={{ height: 120, width: 120, }}
            resizeMode="contain"
            source={{ uri: this.image() }}
          />
          <Text>{this.props.product.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ProductListItem;
