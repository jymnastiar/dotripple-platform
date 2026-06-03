export function getInitials(name: string) {
  if (!name) return "";
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return names[0] ? names[0][0].toUpperCase() : "U";
}
