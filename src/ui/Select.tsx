import styled from "styled-components";

interface StyledSelectProps {
  type: "white" | "black";
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  type: "white" | "black";
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  options,
  value,
  onChange,
  ...props
}: SelectProps) {
  return (
    <StyledSelect defaultValue={value} {...props} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
