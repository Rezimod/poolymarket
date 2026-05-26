/**
 * National Parliamentary Library of Georgia — Glossword lexicons
 * @see http://www.nplg.gov.ge/gwdict/
 *
 * Primary references for Georgian copy in this project:
 * - d=46 დიდი ქართულ-ინგლისური ლექსიკონი (127k+ terms)
 * - d=14 უნივერსალური ენციკლოპედიური ლექსიკონი (78k+ terms)
 */
export const GWDICT_BASE = 'http://www.nplg.gov.ge/gwdict';
export const GWDICT_DICTIONARY_LARGE = 46;
export const GWDICT_DICTIONARY_ENCYCLOPEDIA = 14;

export function gwdictSearchUrl(term: string, dictionaryId: number = GWDICT_DICTIONARY_LARGE): string {
  const params = new URLSearchParams({
    a: 'srch',
    d: String(dictionaryId),
    q: term,
    'srch[adv]': 'all',
    'srch[by]': 'd',
    'srch[in]': '-1',
    search: 'Search',
  });
  return `${GWDICT_BASE}/index.php?${params.toString()}`;
}

export function gwdictTermUrl(term: string, dictionaryId: number = GWDICT_DICTIONARY_LARGE): string {
  return gwdictSearchUrl(term, dictionaryId);
}
