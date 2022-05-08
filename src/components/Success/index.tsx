import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import successIcon from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

export const Success: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={successIcon}
        style={styles.icon}
      />

      <Text
        style={styles.title}
      >
        Agradecemos o feedback!
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
