import cheerio from 'cheerio';
import { DOMAIN } from './api';

export function parseExplanationHTML(html) {
  const $ = cheerio.load(html);

  return $('.entry-body__el').map((i, entry) => {
    const $entry = $(entry);
    const $ipaUK = $entry.find('.uk .ipa');
    const $ipaUS = $entry.find('.us .ipa');

    [$ipaUK, $ipaUS].forEach($ipa => {
      const $sup = $ipa.find('.sp'); // supperscript
      $sup.replaceWith(`<sup>${$sup.text()}</sup>`);
    })

    return {
      pos: $entry.find('.posgram').text(),
      ipaUK: {
        audioUrl: DOMAIN + $entry.find('.uk .sound').data('src-mp3'),
        html: $ipaUK.html(),
      },
      ipaUS: {
        audioUrl: DOMAIN + $entry.find('.us .sound').data('src-mp3'),
        html: $ipaUS.html(),
      },
      senses: $entry.find('.sense-block').map((j, sense) => {
        const $sense = $(sense);
        return {
          guideWord: $sense.find('.guideword').children().first().text(),
          definations: $sense.find('.def-block').map((k, defBlock) => {
            const $defBlock = $(defBlock);
            const $defHead = $defBlock.find('.def-head');
            const $defBody = $defBlock.find('.def-body');
            return {
              id: $defBlock.data('wl-senseid'),
              level: $defHead.find('.epp-xref').text(),
              domain: $defHead.find('.domain').text(),
              text: clearRedendentSpaces($defHead.find('.def').text()),
              translate: $defBody.children('.trans').text(),
              examples: $defBody.find('.examp')
                .map((l, example) => ({
                  text: clearRedendentSpaces($(example).children('.eg').text().trim()),
                  translate: $(example).children('.trans').text(),
                }))
                .get(),
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
