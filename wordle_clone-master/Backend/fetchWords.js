export async function fetchWords() {
    const response = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
    const text = await response.text();
    const words = text.split('\n');
    return words.filter(word => word.length === 5);
  }
  