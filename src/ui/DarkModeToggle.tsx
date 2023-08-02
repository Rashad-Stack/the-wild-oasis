import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import useDarkMode from "../hooks/useDarkMode";
import ButtonIcon from "./Buttonicon";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
