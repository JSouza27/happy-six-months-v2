import { MutableRefObject, useEffect, useState } from 'react';

type ConstraintsType = {
  top: number;
  bottom: number;
};

export function useScrollConstraints(
  ref: MutableRefObject<HTMLDivElement | null>,
  measureConstraints: boolean
) {
  const [constraints, setConstraints] = useState<ConstraintsType>({
    top: 0,
    bottom: 0
  });

  useEffect(() => {
    if (!measureConstraints) return;

    const element = ref.current;

    if (!element) return;

    const viewportHeight = window.innerHeight;
    const contentTop = element.offsetTop;
    const contentHeight = element.offsetHeight;
    const scrollableViewport = viewportHeight - contentTop * 2;
    const top = Math.min(scrollableViewport - contentHeight, 0);

    setConstraints({ top, bottom: 0 });
  }, [measureConstraints]);

  return constraints;
}
