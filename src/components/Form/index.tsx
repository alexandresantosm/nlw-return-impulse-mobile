import React, { useState }  from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ArrowLeft, X } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';

import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';

import { theme } from '../../theme';
import { styles } from './styles';
import { Button } from '../Button';
import { Copyright } from '../Copyright';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
  onCloseFeedbackMenu: () => void;
}

const INITIAL_SCREENSHOT_STATE = null;

export const Form: React.FC<FormProps> = ({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
  onCloseFeedbackMenu
}: FormProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(INITIAL_SCREENSHOT_STATE);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.error(error)
    );
  };

  const handleScreenshotRemove = () => {
    setScreenshot(INITIAL_SCREENSHOT_STATE);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
        onPress={onFeedbackCanceled}
      >
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

      <TouchableOpacity
        onPress={onCloseFeedbackMenu}
      >
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
        autoCorrect={false}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleScreenshotRemove}
        />

        <Button
          isLoading={false}
        />
      </View>

      <Copyright />
    </View>
  );
}
