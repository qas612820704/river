import fetch from 'node-fetch';

export const DOMAIN = 'https://dictionary.cambridge.org';

class CambridgeFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CambridgeFetchError';
  }
}

export class WordNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'WordNotFound';
  }
}

// https://dictionary.cambridge.org/dictionary/english/hello
export async function fetchExplanationHTML(word, options = {}) {
  const { from, to } = {
    from: 'english',
    to: 'english',
    ...options,
  };

  const language = (from !== to) ? `${from}-${to}` : from;

  const response = await fetch(`${DOMAIN}/dictionary/${language}/${word}`, { redirect: 'manual' });

  if (isRedirect(response.status)) throw new WordNotFound(word);

  if (!response.ok) throw new CambridgeFetchError('Fail when getDictionaryHTML.');

  return response.text();
}

export async function fetchAutoCompleteJson(word, options = {}) {
  const { from, to } = {
    from: 'english',
    to: 'english',
    ...options,
  };
  const response = await fetch(`${DOMAIN}/autocomplete/${from}-${to}/?q=${word}`);

  if (!response.ok) throw new CambridgeFetchError('Fail when fetchAutoCompleteJson.');

  return response.json();
}

export default {
  fetchExplanationHTML,
};

function isRedirect(code) {
  return code > 300 && code < 400;
}
