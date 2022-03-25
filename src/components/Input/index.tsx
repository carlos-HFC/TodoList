import { lighten } from "polished";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

import { COLORS } from "../../css/themes/variables";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Floating = styled.div`
  border-radius: 0.5rem;
  display: flex;
  position: relative;
  transition: background-color .3s;
  height: 4rem;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  position: absolute;
  transition: background-color .3s, transform .3s, font-size .3s, color .3s;
  will-change: transform;
  pointer-events: none;
  left: 1rem;
  color: ${props => props.theme.text};
`;

const InputBlock = styled.input`
  background: transparent;
  border: 0;
  padding: 0 1rem;
  appearance: none;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  position: relative;
  width: 100%;
  transition: box-shadow .3s, background-color .3s, color .3s;
  height: inherit;
  outline: 0;
  border-radius: inherit;
  color: ${props => props.theme.text};
  box-shadow: 0 0 0 .15rem ${lighten(.7, COLORS.black)};

  &::placeholder {
    opacity: 0;
  }

  &:focus, &:not(:placeholder-shown) {
    outline: none;
    padding-top: 1.5rem;

    & ~ ${Label} {
      font-size: .85rem;
      transform: translateY(-.85rem);
    }
  }
`;

export function Input({ label = "To Do:", ...props }: InputProps) {
  return (
    <Floating>
      <InputBlock autoComplete="off" id={props.id} placeholder={label} {...props} />
      <Label htmlFor={props.id}>{label}</Label>
    </Floating>
  );
}

