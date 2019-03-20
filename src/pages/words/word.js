import React, { useCallback, useEffect } from 'react';
import { Spin } from 'antd';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { getWord, increaseWordSearchCount } from '../../redux/actions';

export default function Word({ word }) {
  const translation = useMappedState(
    useCallback(
      state => state.getIn(['words', word]),
      [word],
    ),
  );
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(increaseWordSearchCount(word));
    },
    [word]
  );

  if (!translation) {
    dispatch(getWord(word));
  }

  if (!translation || translation.get('isFetching')) {
    return <Spin />;
  }

  return translation.toString();
}
