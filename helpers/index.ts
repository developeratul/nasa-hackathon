export function getTwoWordRepresentation(name: string): string {
  const words = name.split(" ");

  // Get the first letter of the first name (in full caps)
  const firstNameInitial = words[0]?.charAt(0)?.toUpperCase() || "";

  // Get the first letter of the last name (in full caps)
  const lastNameInitial = words.length > 1 ? words[words.length - 1]?.charAt(0)?.toUpperCase() : "";

  // Combine the two initials and return the result
  const result = `${firstNameInitial}${lastNameInitial}`;

  return result;
}

export function getTimeBasedGreeting(date: Date = new Date()): string {
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) {
    return "Good morning";
  } else if (hours >= 12 && hours < 17) {
    return "Good afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
}
