import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';

export default function Words({ children }) {
  return (
    <div>
      { children }
    </div>
  );
}
