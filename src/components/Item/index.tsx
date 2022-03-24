import { darken } from "polished";
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { VscEdit, VscTrash } from "react-icons/vsc";
import styled, { css } from "styled-components";

import { Button } from "..";

import { COLORS } from "../../css/themes/variables";

interface ItemProps {
  children: ReactNode;
  checked?: boolean;
  onChecked?: InputHTMLAttributes<HTMLInputElement>['onClick'];
  onEdit?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  onDelete?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

const Wrapper = styled.li<Pick<ItemProps, 'checked'>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${props => props.theme.list.border};
  border-radius: 0.5rem;
  width: 100%;
  padding: 0 1rem;
  box-shadow: 0 1px 2px 1px ${props => props.theme.shadow};
  background: ${props => props.theme.background};
  transition: box-shadow .3s, border-color .3s, background-color .3s;
  position: relative;
  gap: 1rem;

  @media (min-width: 992px) {
    width: 80%;
  }

  ${props => props.checked && css`
    background: ${props.theme.list.bgChecked};
    border-color: ${props.theme.list.borderChecked};
    
    .item_check {
      label {
        font-style: italic;
        text-decoration: line-through;
        color: ${darken(.2, props.theme.list.borderChecked)};
        opacity: .8;
      }
    }
  `}

  .item_check {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    input[type="checkbox"] {
      appearance: none;
      border: 2px solid ${COLORS.gray400};
      outline: none;
      position: relative;
      transition: background-color .2s, border-color .2s;
      border-radius: .25rem;
      height: 1.2rem;
      width: 1.2rem;
      min-width: 1.2rem;
      max-width: 1.2rem;
      min-height: 1.2rem;
      max-height: 1.2rem;
      user-select: none;

      &:checked {
        background: ${COLORS.gray600};
        border-color: ${COLORS.gray600};
      }
    }

    label {
      width: 100%;
      color: ${props => props.theme.text};
      transition: color .3s, font-style .3s, text-decoration .3s, opacity .3s;
      will-change: opacity;
      font-size: 1rem;
      user-select: none;
      display: flex;
      align-items: stretch;
      padding: 1rem 0;
    }
  }

  .item_btn {
    display: flex;
    gap: .25rem;

    @media (min-width: 768px) {
      gap: 0.5rem;
    }

    button {
      padding: 0.5rem;
      font-size: .8rem;
      border-radius: .25rem
    }
  }
`;

export function Item(props: ItemProps) {
  return (
    <Wrapper checked={props.checked}>
      <div className="item_check">
        <input type="checkbox" id={String(props.children)} defaultChecked={props.checked} onClick={props.onChecked} />
        <label htmlFor={String(props.children)}>{props.children}</label>
      </div>
      <div className="item_btn">
        <Button variant="warning" onClick={props.onEdit} disabled={props.checked}>
          <VscEdit />
        </Button>
        <Button variant="danger" onClick={props.onDelete} disabled={props.checked}>
          <VscTrash />
        </Button>
      </div>
    </Wrapper>
  );
}