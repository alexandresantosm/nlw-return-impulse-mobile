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
import * as FileSystem from 'expo-file-system';

import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { Copyright } from '../Copyright';
import { api } from '../../lib/api';

import { theme } from '../../theme';
import { styles } from './styles';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
  onCloseFeedbackMenu: () => void;
}

const INITIAL_SCREENSHOT_STATE = null;
const INITIAL_SENDING_FEEDBACK_STATE = false;
const INITIAL_COMMENT_STATE = '';

export const Form: React.FC<FormProps> = ({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
  onCloseFeedbackMenu
}: FormProps) => {
  const [isSendingFeedback, setIsSendingFeedback] = useState(INITIAL_SENDING_FEEDBACK_STATE);
  const [screenshot, setScreenshot] = useState<string | null>(INITIAL_SCREENSHOT_STATE);
  const [comment, setComment] = useState<string | null>(INITIAL_COMMENT_STATE);

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

  const handleInputChange = (commentSent: string) => {
    setComment(commentSent);
  }

  const handleSendFeedback = async () => {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 = 
      screenshot
      &&
        await FileSystem
          .readAsStringAsync(
            screenshot,
            { encoding: 'base64'}
          );

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });
      
      onFeedbackSent();
    } catch (error) {
      console.error(error);
      setIsSendingFeedback(INITIAL_SENDING_FEEDBACK_STATE);
    }
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
        onChangeText={(commentSent) => handleInputChange(commentSent)}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleScreenshotRemove}
        />

        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>

      <Copyright />
    </View>
  );
}
