export const FONTS = {
  regular: 'InterRegular',
  medium: 'InterSemiBold',
  bold: 'InterBold',
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  heading: 32,
  title: 22,
  subtitle: 17,
  caption: 11,
};

export const FONT_WEIGHTS = {
  normal: '400',
  medium: '600',
  bold: '700',
};

export const TYPOGRAPHY = {
  heading: {
    fontSize: FONT_SIZES.heading,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 40,
  },
  
  title: {
    fontSize: FONT_SIZES.title,
    fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 28,
  },
  
  subtitle: {
    fontSize: FONT_SIZES.subtitle,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 22,
  },
  
  body: {
    fontSize: FONT_SIZES.base,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: 24,
  },
  
  bodyMedium: {
    fontSize: FONT_SIZES.base,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: FONT_SIZES.caption,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: 16,
  },
  
  small: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: 20,
  },
  
  button: {
    fontSize: FONT_SIZES.base,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 20,
  },
  
  deviceName: {
    fontSize: FONT_SIZES.base,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 20,
  },
  
  deviceId: {
    fontSize: FONT_SIZES.caption,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: 14,
  },
  
  statusText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.regular,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: 18,
  },
  
  bluetoothState: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.medium,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 16,
  },
};
