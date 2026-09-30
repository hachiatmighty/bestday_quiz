export function firstSentence(text) {
  return text.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() ?? text;
}
