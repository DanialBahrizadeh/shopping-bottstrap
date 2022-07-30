import { useEffect, useState } from "react";

const useSessionStorage = <T>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const josnValue = sessionStorage.getItem(key);
    if (josnValue) return JSON.parse(josnValue);

    if (typeof initialValue === "function") return (initialValue as () => T)();

    return initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));

    return () => {
      sessionStorage.removeItem(key);
    };
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
};

export default useSessionStorage;
