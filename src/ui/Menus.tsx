import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface StyledListProps {
  position: {
    x: number;
    y: number;
  };
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 1;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface Positions {
  x: number;
  y: number;
}

interface MenusProps {
  children: React.ReactNode;
}
interface MenusContextProps {
  openId: number | null;
  close(): void;
  open: (id: number) => void;
  setPositions: (positions: Positions) => void;
  positions: Positions | undefined;
}

const MenusContext = createContext<MenusContextProps>({
  openId: null,
  close: () => {},
  open: () => {},
  setPositions: () => {},
  positions: undefined,
});

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [positions, setPositions] = useState<Positions>();

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, setPositions, positions }}>
      {children}
    </MenusContext.Provider>
  );
}

interface ToggleProps {
  id: number;
}
function Toggle({ id }: ToggleProps) {
  const { openId, close, open, setPositions } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const target = e.target as Element;
    const buttonElement = target.closest("button");
    if (!buttonElement) return null;

    const rect = buttonElement.getBoundingClientRect();

    setPositions({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === null || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  id: number;
  children: React.ReactNode;
}

function List({ id, children }: ListProps) {
  const { openId, positions, close } = useContext(MenusContext);
  const listRef = useOutsideClick<HTMLUListElement>(close, false);
  if (openId !== id) return null;

  return (
    <StyledList position={positions!} ref={listRef}>
      {children}
    </StyledList>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
function Button({ children, icon, onClick, disabled }: ButtonProps) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handleClick} disabled={disabled}>
      {icon} <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
