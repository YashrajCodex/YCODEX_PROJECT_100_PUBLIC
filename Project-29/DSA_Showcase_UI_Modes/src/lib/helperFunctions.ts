export function textToArray(text: string, type: "number" | "string") {
  const cleanArrayNum = text
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => !isNaN(item));
  const cleanArrayText = text
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item === "");

  return type === "number" ? cleanArrayNum : cleanArrayText;
}
export function sortArray<T>(
    array: T[],
    sortBy: string | number,
    orderBy: "asc" | "desc" = "asc"
  ) {
    if (!array || !sortBy) return [];

    //creating a shallow copy of the array to avoid mutating the original array.
    const sortedArray = [...array];
    sortedArray.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];

      if (typeof valA === "string" && typeof valB === "string") {
        const comparison = valA.localeCompare(valB);
        return orderBy === "desc" ? -comparison : comparison;
      }
      if (typeof valA === "number" && typeof valB === "number") {
        const comparison = valA - valB;
        return orderBy === "desc" ? -comparison : comparison;
      }
    });

    return sortedArray;
}

export function swap(a, b) {
  const temp = a;
  a = b;
  b = temp;
  return [a, b];
}