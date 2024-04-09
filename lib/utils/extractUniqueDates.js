export default function extractUniqueDates(data) {
  const uniqueDates = new Set();
        
    data.forEach(entry => {
        const timestamp = new Date(entry.timestamp);
        const date = timestamp.toISOString().split('T')[0]; 
        uniqueDates.add(date);
    });
    
    return Array.from(uniqueDates);
}