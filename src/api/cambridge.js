import { parseSuggestionsHTML } from '../cambridge-dictionary';

export async function fetchSuggestions(word) {
  const suggestions = await fetch(`http://localhost:9527/cambridge/english/spellcheck/${word}`)
    .then(res => res.text())
    .then(text => parseSuggestionsHTML(text))

  return suggestions;
}
