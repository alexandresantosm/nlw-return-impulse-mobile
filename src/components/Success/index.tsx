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

interface SuccessProps {
  onSendAnotherFeedback: () => void;
}

export const Success: React.FC<SuccessProps> = ({ onSendAnotherFeedback }: SuccessProps) => {
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

      <TouchableOpacity
        onPress={onSendAnotherFeedback}
        style={styles.button}
      >
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
