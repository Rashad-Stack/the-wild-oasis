import {
  ReactElement,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalProps {
  children: React.ReactNode;
}

interface ModalOpenProps {
  children: React.ReactNode;
  opens: string;
}

interface ModalWindowProps {
  children: React.ReactNode;
  name: string;
}

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps>({
  openName: "",
  close: () => {},
  open: () => {},
});

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: ModalOpenProps) {
  const { open } = useContext(ModalContext);

  // Now we can safely clone the element and modify its props
  return cloneElement(children as ReactElement, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }: ModalWindowProps) {
  const { openName, close } = useContext(ModalContext);

  const windowRef = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={windowRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children as ReactElement, {
          onCloseModal: close,
        })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
