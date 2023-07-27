import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

interface FilterButtonProps {
  active: boolean;
}

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  filterField: "discount";
  options: { value: string; label: string }[];
}

export default function Filter({ filterField, options }: FilterProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentFilter = searchParam.get(filterField) || options[0].value;
  function handleClick(value: string) {
    searchParam.set(filterField, value);
    setSearchParam(searchParam);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
