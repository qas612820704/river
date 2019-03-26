import { useEffect, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import {
  getWord, increaseWordSearchCount,
  mapDefinationToDictionary, unmapDefinationToDictionary
} from './actions';

export function useWord(wordId) {
  const word = useMappedState(
    useCallback(
      state => state.words[wordId],
      [wordId],
    ),
  );
  const dispatch = useDispatch();

  useEffect(
    () => { increaseWordSearchCount(wordId) },
    [wordId],
  );

  if (!word) {
    dispatch(getWord(wordId));
  }

  return {
    word,
  }
}

export function useDefination(definationId) {
  const defination = useMappedState(
    useCallback(
      state => {
        const defination = state.definations[definationId];

        return {
          ...defination,
          isInSomeDictionary: defination.dictionaries.length !== 0,
        }
      },
      [definationId],
    ),
  );

  const dispatch = useDispatch();

  const toggleMapDefinationToDictionary = useCallback(
    () => {
      const handler = defination.isInSomeDictionary
        ? unmapDefinationToDictionary
        : mapDefinationToDictionary;
      dispatch(handler(definationId));
    },
    [defination.isInSomeDictionary],
  )

  return {
    defination,
    toggleMapDefinationToDictionary,
  }
}
