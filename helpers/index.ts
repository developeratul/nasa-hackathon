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
