import { useEffect } from "react";

export const useDisableScroll = (disabled: boolean) => {
  useEffect(() => {
    if (disabled) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Disable scrolling
      document.body.style.overflow = "hidden";

      // Cleanup
      return () => {
        document.body.style.overflow = "";
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [disabled]);
};
