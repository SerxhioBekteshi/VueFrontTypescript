export function getNameById(myObject: any, id: number) {
  for (const [key, value] of Object.entries(myObject)) {
    if (value === id) {
      const nameKey = key === "id" ? "name" : "id"; // Assuming 'name' is the opposite key
      return myObject[nameKey];
    }
  }
  return null;
}
