import React, { useState, useCallback } from 'react';
import { parseSenseHTML } from './cambridge-dictionary';

export default function App() {
  const [ word, setWord ] = useState('');
  const [ result, setResult ] = useState('');
  const goSearch = useCallback((e) => {
    e.preventDefault();
    setResult('');
    fetch(`http://localhost:9527/cambridge/english/${word}`)
      .then(res => res.text())
      .then(text => parseSenseHTML(text))
      .then(json => setResult(JSON.stringify(json)));
  }, [word]);

  return (
    <section>
      <form onSubmit={goSearch}>
        <input type="text" value={word} onChange={e => setWord(e.target.value)}/>
        <button type="submit">Search</button>
      </form>
      <p>{result}</p>
    </section>
  );
};
