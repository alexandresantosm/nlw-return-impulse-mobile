import { ArrowLeft, X } from 'phosphor-react-native';
import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';

import { theme } from '../../theme';
import { styles } from './styles';
import { Button } from '../Button';
import { Copyright } from '../Copyright';

interface FormProps {
  feedbackType: FeedbackType;
}

export const Form: React.FC<FormProps> = ({ feedbackType }: FormProps) => {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity>
        <ArrowLeft
          size={24}
          weight='bold'
          color={theme.colors.text_secondary}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Image
          source={feedbackTypeInfo.image}
          style={styles.image}
        />
        
        <Text style={styles.titleText}>
          {feedbackTypeInfo.title}
        </Text>
      </View>

      <TouchableOpacity>
        <X
          size={24}
          weight='bold'
          color={theme.colors.text_secondary}
        />
      </TouchableOpacity>
    </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder='Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot=''
          onTakeScreenshot={() => {}}
          onRemoveScreenshot={() => {}}
        />

        <Button
          isLoading={false}
        />
      </View>

      <Copyright />
    </View>
  );
}
