import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  icon: {
    width: 36,
    height: 36,
    marginTop: 42,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    marginBottom: 24,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_on_brand_color,
  },

  button: {
    height: 40,
    borderRadius: 4,
    backgroundColor: theme.colors.surface_secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 56,
  },

  buttonTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
  },
});
