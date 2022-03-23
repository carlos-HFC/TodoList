import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    text: string;
    background: string;
    header: string;
    list: {
      border: string;
      borderChecked: string;
      bgChecked: string;
    };
    shadow: string;
    button: {
      primary: {
        bg: string;
        text: string;
      };
      secondary: {
        bg: string;
        text: string;
      };
      warning: {
        bg: string;
        text: string;
      };
      success: {
        bg: string;
        text: string;
      };
      danger: {
        bg: string;
        text: string;
      };
    };
  }
}