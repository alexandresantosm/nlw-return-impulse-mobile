import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { TouchableOpacity, Image ,View } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onTakeScreenshot: () => void;
  onRemoveScreenshot: () => void;
}

export const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({
  screenshot,
  onTakeScreenshot,
  onRemoveScreenshot,
}: ScreenshotButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
    >
      {
        screenshot
          ? 
            <Trash
              size={22}
              color={theme.colors.text_secondary}
              weight='fill'
              style={styles.removeIcon}
            />
          :
            <Camera
              size={24}
              color={theme.colors.text_secondary}
              weight='bold'
            />
      }
    </TouchableOpacity>
  );
};
