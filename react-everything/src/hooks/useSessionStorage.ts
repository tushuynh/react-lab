import { useState, useEffect } from 'react';

type UseSessionStorageResult<T> = [
  T,
  (value: T | ((prevValue: T) => T)) => void,
];

const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): UseSessionStorageResult<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Error updating sessionStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
