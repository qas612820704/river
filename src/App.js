import React, { useState, useCallback } from 'react';
import { Router, Link, navigate } from '@reach/router';
import { Layout, Input, AutoComplete } from 'antd';
import Words from './pages/words';
import Word from './pages/words/word';
import Dictionaries from './pages/dictionaries';
import Dictionary from './pages/dictionaries/dictionary';
import { fetchAutoCompleteJson } from './api/cambridge';
import './App.css';

const { Content } = Layout;

export default function App() {
  return (
    <Router>
      <Main path="/">
        <Words path="words">
          <Word path=":wordId"/>
        </Words>
        <Dictionaries path="dictionaries">
          <Dictionary path=":dictionaryId" />
        </Dictionaries>
      </Main>
    </Router>
  );
};

function Main({ children }) {
  const [ suggestions, handleSuggestion ] = useSuggestion();

  const handleSearch = useCallback(
    word => navigate(`/words/${word}`),
    [],
  );

  return (
    <Content className="app-container">
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
      <Link to="/dictionary">Go to My Dictionary</Link>
      { children }
    </Content>
  );
}

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
