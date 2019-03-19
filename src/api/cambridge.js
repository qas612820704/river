export async function fetchAutoCompleteJson(word) {
  const response = await fetch(`http://localhost:9527/cambridge/english-chinese-traditional/auto-complete/${word}`)

  return response.json();
}
