export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const formatDayOfWeek = (dayOfWeek: string) => {
  const dayMap: Record<string, string> = {
    'MON': 'Monday',
    'TUE': 'Tuesday', 
    'WED': 'Wednesday',
    'THU': 'Thursday',
    'FRI': 'Friday',
    'SAT': 'Saturday',
    'SUN': 'Sunday'
  };
  return dayMap[dayOfWeek] || dayOfWeek;
};

export const formatTime = (time: string) => {
  // Convert 24-hour format to 12-hour format if needed
  if (time.includes('h')) {
    return time; // Already in desired format
  }
  
  try {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch {
    return time; // Return original if parsing fails
  }
};
