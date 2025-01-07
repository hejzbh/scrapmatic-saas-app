import { useEffect, useMemo, useState } from "react";

export const useDebounce = ({
  initialValue,
  onDebouncedValue,
  delay = 300,
}: {
  initialValue: string;
  onDebouncedValue: (value: string) => void;
  delay: number;
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    // Postavi timeout za ažuriranje vrednosti
    const handler = setTimeout(() => {
      onDebouncedValue(value);
    }, delay);

    // Očisti prethodni timeout ako se `value` ili `delay` promene
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return useMemo(
    () => ({
      setValue,
      value,
    }),
    [value]
  );
};
