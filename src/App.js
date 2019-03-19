import React, { useState, useCallback } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Map } from 'immutable';
import { Input, AutoComplete } from 'antd';
import { getWord } from './redux/actions';
import { fetchAutoCompleteJson } from './api/cambridge';
import './App.css';

export default function App() {
  const [ translation, setTranslation ] = useState(Map());

  const [ suggestions, handleSuggestion ] = useSuggestion();
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    async word => {
      const translation = await dispatch(getWord(word));
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
      { translation.has('word') &&
        <section>
          <h1>{translation.get('word')}</h1>
          <ul>
          { translation.get('explanations').map(exp => (
            <li>{exp.toString()}</li>
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
      const { results: suggestions } = await fetchAutoCompleteJson(value);
      setSuggestion(suggestions.map(s => s.searchtext));
    },
    [],
  );

  return [ suggestions, handleSuggestion ];
}
