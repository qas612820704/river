const apiDomain = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9527'
  : 'https://river.qas612820704.now.sh';

export async function fetchAutoCompleteJson(word) {
  const response = await fetch(`${apiDomain}/cambridge/english-chinese-traditional/auto-complete/${word}`)

  return response.json();
}

export async function fetchWord(word) {
  const response = await fetch(`${apiDomain}/cambridge/english-chinese-traditional/${word}`);

  return response.json();
}

