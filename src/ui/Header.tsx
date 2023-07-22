import { styled } from "styled-components";

const HeaderStyles = styled.header`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

export default function Header() {
  return <HeaderStyles>Header</HeaderStyles>;
}
