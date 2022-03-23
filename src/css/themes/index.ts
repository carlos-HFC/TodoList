import { COLORS } from "./variables";

export const dark = {
  name: `dark`,
  text: COLORS.white,
  background: COLORS.gray900,
  header: COLORS.gray800,
  list: {
    border: COLORS.gray400,
    borderChecked: COLORS.gray700,
    bgChecked: COLORS.gray700,
  },
  shadow: `rgba(255,255,255,.2)`,
  button: {
    primary: {
      bg: COLORS.blue,
      text: COLORS.white
    },
    secondary: {
      bg: COLORS.gray400,
      text: COLORS.white
    },
    warning: {
      bg: COLORS.yellow,
      text: COLORS.white
    },
    success: {
      bg: COLORS.green,
      text: COLORS.white
    },
    danger: {
      bg: COLORS.red,
      text: COLORS.white
    },
  }
};

export const light = {
  name: `light`,
  text: COLORS.gray800,
  background: COLORS.offWhite,
  header: COLORS.purple,
  list: {
    border: COLORS.gray200,
    borderChecked: COLORS.gray300,
    bgChecked: COLORS.gray200,
  },
  shadow: `rgba(0,0,0,.2)`,
  button: {
    primary: {
      bg: COLORS.blue,
      text: COLORS.white
    },
    secondary: {
      bg: COLORS.gray400,
      text: COLORS.black
    },
    warning: {
      bg: COLORS.yellow,
      text: COLORS.black
    },
    success: {
      bg: COLORS.green,
      text: COLORS.white
    },
    danger: {
      bg: COLORS.red,
      text: COLORS.white
    },
  }
};