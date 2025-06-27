import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const INITIAL_STATE = {
  left: 0,
  width: 0,
  opacity: 0,
};

export const useSlideUnderlineAnimation = <ItemElement extends HTMLElement>(
  activeIndex: number
) => {
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(ItemElement | null)[]>([]);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [underlineStyle, setUnderlineStyle] =
    useState<typeof INITIAL_STATE>(INITIAL_STATE);

  useEffect(() => {
    if (
      activeIndex !== -1 &&
      itemRefs.current[activeIndex] &&
      containerRef.current
    ) {
      const activeItem = itemRefs.current[activeIndex];
      const container = containerRef.current;

      if (activeItem) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        const newStyle = {
          left: itemRect.left - containerRect.left,
          width: itemRect.width,
          opacity: 1,
        };

        setUnderlineStyle(newStyle);

        if (isInitialMount) {
          requestAnimationFrame(() => {
            setIsInitialMount(false);
          });
        }
      }
    } else {
      setUnderlineStyle((previous) => ({ ...previous, opacity: 0 }));
    }
  }, [activeIndex]);

  const setItemRef = (index: number) => (element: ItemElement | null) => {
    itemRefs.current[index] = element;
  };

  const className = clsx(
    "absolute bottom-0 h-1 bg-primary-300 ease-out",
    isInitialMount ? "transition-none" : "transition-all duration-300"
  );

  const underlineProps = {
    className,
    style: underlineStyle,
  };

  return {
    containerRef,
    setItemRef,
    underlineProps,
  };
};
