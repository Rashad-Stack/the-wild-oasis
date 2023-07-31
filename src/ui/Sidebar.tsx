import { styled } from "styled-components";
import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

const SidebarStyles = styled.aside`
  background-color: var(--color-gray-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;
export default function Sidebar() {
  return (
    <SidebarStyles>
      <Logo />
      <MainNav />

      <Uploader />
    </SidebarStyles>
  );
}
