export function truncateWords(text: string, limit = 5) {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  }
  
 export function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  

  export function formatTime(dateString: string) {
    const date = new Date(dateString);
  
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  