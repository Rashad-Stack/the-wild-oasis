import { styled } from "styled-components";
import Logout from "../features/authentication/Logout";

const HeaderStyles = styled.header`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

export default function Header() {
  return (
    <HeaderStyles>
      <Logout />
    </HeaderStyles>
  );
}
