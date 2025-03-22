/* eslint-disable @typescript-eslint/no-unused-vars */

import { RefObject, useRef } from 'react';
import useInterval from './useInterval';
import useTimeout from './useTimeout';
import useClickOutside from './useClickOutside';
import { useCopyToClipboard } from './useCopyToClipboard';
import useHover from './useHover';

const useTimeoutExample = () => {
  useTimeout(() => {
    console.log('Timeout completed!');
  }, 2000);
};

const useIntervalExample = () => {
  useInterval(() => {
    console.log('Interval tick!');
  }, 1000);
};

const ClickOutsideExample = () => {
  const ref = useRef<HTMLDivElement>(document.createElement('div'));

  useClickOutside(ref, () => {
    console.log('Clicked outside the box!');
  });

  return (
    <div>
      <div
        ref={ref}
        style={{ border: '1px solid black', padding: '20px', margin: '20px' }}
      >
        <p>Click outside this box!</p>
      </div>
    </div>
  );
};

const CopyTextComponent: React.FC = () => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard('Hello, World!');
  };

  return (
    <div>
      <button onClick={handleCopy}>
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

const HoverComponent: React.FC = () => {
  const hoverRef = useRef<HTMLDivElement>(document.createElement('div'));
  const isHovered = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      style={{
        width: '200px',
        height: '200px',
        backgroundColor: isHovered ? 'lightgreen' : 'lightcoral',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        color: 'white',
      }}
    >
      {isHovered ? 'Hovered!' : 'Hover over me'}
    </div>
  );
};
