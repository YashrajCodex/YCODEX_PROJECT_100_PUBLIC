export default function buildGenreQuery(
  selectedGenre: string[],
  logicOperator: "AND" | "OR"
) {
  if (!selectedGenre || selectedGenre.length === 0) {
    return "";
  }
  const operator = logicOperator === "OR" ? "OR" : "AND";

  const genreQueries = selectedGenre.map(
    (genre) => `subject:${encodeURIComponent(genre)}`
  );

  return genreQueries.join(`+${operator}+`);
}
