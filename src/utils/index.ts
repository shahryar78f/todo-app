export function truncateWords(text: string, limit = 5) {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  }
  