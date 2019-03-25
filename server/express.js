import express from 'express';
import cors from 'cors';
import { fetchExplanationHTML, fetchAutoCompleteJson } from './cambridge-dictionary/api';
import { parseExplanationHTML } from './cambridge-dictionary/parser';

const app = express();

app.use(cors());

app.get('/cambridge/:from-:to/:word', async (req, res) => {
  const { word, from, to } = req.params;

  const explanationHtml = await fetchExplanationHTML(word, { from, to });

  const explanations = parseExplanationHTML(explanationHtml);

  res.json({
    id: word,
    name: word,
    explanations
  });
});

app.get('/cambridge/:from-:to/auto-complete/:word', async (req, res) => {
  const { word, from, to } = req.params;

  const autocompleteJson = await fetchAutoCompleteJson(word, { from, to });

  res.json(autocompleteJson);
})

export default app;
