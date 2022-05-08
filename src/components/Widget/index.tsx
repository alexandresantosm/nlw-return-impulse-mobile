import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';
import { FeedbackType } from '../../utils/feedbackTypes';

import { styles } from './styles';
import { theme } from '../../theme';

const INITIAL_FEEDBACK_TYPE_STATE = null;
const INITIAL_FEEDBACK_SENT_STATE = false;

const WidgetComponent: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(INITIAL_FEEDBACK_TYPE_STATE);
  const [feedbackSent, setFeedbackSent] = useState(INITIAL_FEEDBACK_SENT_STATE);

  const handleFeedbackTypeChange = (fedbackType: FeedbackType) => setFeedbackType(fedbackType);

  const handleRestartFeedback = () => {
    setFeedbackType(INITIAL_FEEDBACK_TYPE_STATE);
    setFeedbackSent(INITIAL_FEEDBACK_SENT_STATE);
  };

  const handleFeedbackSent = () => setFeedbackSent(true);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenFeedbackMenu = () => {
    bottomSheetRef.current?.expand();
  }

  const handleCloseFeedbackMenu = () => {
    bottomSheetRef.current?.close();
    handleRestartFeedback();
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpenFeedbackMenu}
      >
          <ChatTeardropDots
            size={24}
            weight='bold'
            color={theme.colors.text_on_brand_color}
          />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >

        {
          feedbackSent
          ?
          <Success />
          :
          <>
            {
              feedbackType
              ?
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
                onCloseFeedbackMenu={handleCloseFeedbackMenu}
              />
              :
              <Options onFeedbackTypeChange={handleFeedbackTypeChange} />
            }
          </> 
        }
      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent);
