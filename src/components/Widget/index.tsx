import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';

const WidgetComponent: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenFeedbackMenu = () => {
    bottomSheetRef.current?.expand();
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

      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent);
