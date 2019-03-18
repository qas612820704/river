import React, { useState, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Input, AutoComplete } from 'antd';
import { getWord } from './redux/actions';
import { fetchSuggestions } from './api/cambridge';
import './App.css';

export default function App() {
  const [ translation, setTranslation ] = useState({});

  const [ suggestions, handleSuggestion ] = useSuggestion();
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    async word => {
      const translation = await dispatch(getWord(word));
      console.log(translation);
      setTranslation(translation);
    },
    [],
  )

  return (
    <section className="app-container">
      <header className="text-center">
        <AutoComplete
          dataSource={suggestions}
          onSelect={handleSearch}
          onSearch={handleSuggestion}
        >
          <Input.Search
            placeholder="translate..."
            onSearch={handleSearch}
          />
        </AutoComplete>
      </header>
      { translation.word &&
        <section>
          <h1>{translation.word}</h1>
          <ul>
          { translation.senses.map(sense => (
            <li>{JSON.stringify(sense)}</li>
          ))}
          </ul>
        </section>
      }
    </section>
  );
};

function useSuggestion() {
  const [ suggestions, setSuggestion ] = useState([]);

  const handleSuggestion = useCallback(
    async (value) => {
      if (value === '') return;
      const { hasExact, suggestions } = await fetchSuggestions(value);
      setSuggestion([]);
      setSuggestion(
        hasExact
        ? [ value, ...suggestions]
        : suggestions
      );
    },
    [],
  );

  return [ suggestions, handleSuggestion ];
}
