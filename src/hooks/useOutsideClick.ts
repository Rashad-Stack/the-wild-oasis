import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
) {
  const windowRef = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        console.log("clicked outside");
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return windowRef as React.MutableRefObject<T | null>;
}
