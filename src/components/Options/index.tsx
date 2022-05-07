import React from 'react';
import { View } from 'react-native';
import { Copyright } from '../Copyright';

import { styles } from './styles';

export const Options: React.FC = () => {
  return (
    <View style={styles.container}>
      <Copyright />
    </View>
  );
}
