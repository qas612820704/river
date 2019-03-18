import cheerio from 'cheerio';

export function parseSenseHTML(html) {
  const $ = cheerio.load(html);
  const $dataRoot = $('#dataset-cald4');

  return $dataRoot.find('.entry-body__el').map((i, entry) => {
    const $entry = $(entry);
    return {
      pos: $entry.find('.posgram').text(),
      ipaUK: $entry.find('.uk .ipa').text(),
      ipaUS: $entry.find('.us .ipa').text(),
      senses: $entry.find('.sense-block').map((j, sense) => {
        const $sense = $(sense);
        return {
          guideWord: $sense.find('.guideword').children().first().text(),
          definations: $sense.find('.def-block').map((k, defBlock) => {
            const $defBlock = $(defBlock);
            const $defHead = $defBlock.find('.def-head');
            const $defBody = $defBlock.find('.def-body');
            return {
              level: $defHead.find('.epp-xref').text(),
              domain: $defHead.find('.domain').text(),
              text: clearRedendentSpaces($defHead.find('.def').text()),
              examples: $defBody.find('.examp')
                .map((l, example) => $(example).text()).get()
                .map(text => text.trim())
                .map(clearRedendentSpaces),
            };
          }).get(),
        };
      }).get(),
    };
  }).get();
}

export function parseSuggestionsHTML(html) {
  const $ = cheerio.load(html);

  return {
    hasExact: $('ul.unstyled.prefix-block.a--b.a--rev').length === 1,
    suggestions: $('ol.unstyled.prefix-block.a--b.a--rev').find('.prefix-item')
    .map(
      (i, suggestion) => $(suggestion).text()
    )
    .get()};
}

function clearRedendentSpaces(text = '') {
  return text.replace(/[\s\n|\t]+/g, ' ');
}
