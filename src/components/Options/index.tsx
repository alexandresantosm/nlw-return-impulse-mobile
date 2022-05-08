import React from 'react';
import { Text, View } from 'react-native';
import { Copyright } from '../Copyright';

import { FeedbackType, feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';
import { Option } from '../Option';

interface OptionsProps {
  onFeedbackTypeChange: (fedbackType: FeedbackType) => void;
}

export const Options: React.FC<OptionsProps> = ({ onFeedbackTypeChange }: OptionsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>

      <View style={styles.options}>
        {
          Object
            .entries(feedbackTypes)
              .map(([key, value], index) => (
                <Option
                  key={`${key}-${index}`}
                  title={value.title}
                  image={value.image}
                  onPress={() => onFeedbackTypeChange(key as FeedbackType)}
                />
              ))
        }
      </View>

      <Copyright />
    </View>
  );
}
