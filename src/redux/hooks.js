import { useEffect, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { map } from 'lodash';
import { getWord, increaseWordSearchCount } from './actions';

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

        return defination;
      },
      [definationId],
    ),
  );

  return {
    defination,
  }
}

export function useDictionaries() {
  const dictionaries = useMappedState(
    useCallback(
      state => state.dictionaries,
      [],
    ),
  );

  return {
    dictionaries: map(dictionaries),
  };
}

export function useDictionary(dictionaryId) {
  const dictionary = useMappedState(
    useCallback(
      state => state.dictionaries[dictionaryId],
      [dictionaryId],
    ),
  );

  return {
    dictionary,
  };
}
