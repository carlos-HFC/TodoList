import { darken, transparentize } from "polished";
import { ButtonHTMLAttributes } from "react";
import styled, { DefaultTheme } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof DefaultTheme['button'];
  block?: boolean;
}

export const Button = styled.button<ButtonProps>(props => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: "1rem",
  border: "1px solid transparent",
  outline: "none",
  padding: "0.75rem 1rem",
  cursor: "pointer",
  userSelect: "none",
  borderRadius: "0.5rem",
  background: props.theme.button[props.variant as keyof DefaultTheme['button']].bg,
  color: props.theme.button[props.variant as keyof DefaultTheme['button']].text,
  borderColor: props.theme.button[props.variant as keyof DefaultTheme['button']].bg,
  transition: "background-color .3s, color .3s, border-color .3s, box-shadow .3s, opacity .3s",
  width: props.block ? "100%" : "auto",
  lineHeight: 1.5,

  ":disabled": {
    cursor: "not-allowed",
    pointerEvents: "auto",
    opacity: .6,
  },

  ":not(:disabled):hover": {
    background: darken(.075, props.theme.button[props.variant as keyof DefaultTheme['button']].bg),
    borderColor: darken(.075, props.theme.button[props.variant as keyof DefaultTheme['button']].bg),
  },

  ":not(:disabled):is(:active, :focus)": {
    background: darken(.05, props.theme.button[props.variant as keyof DefaultTheme['button']].bg),
    borderColor: darken(.05, props.theme.button[props.variant as keyof DefaultTheme['button']].bg),
    boxShadow: `0 0 0 .25rem ${transparentize(.5, props.theme.button[props.variant as keyof DefaultTheme['button']].bg)}`,
  }
}));

Button.defaultProps = {
  variant: 'primary'
};