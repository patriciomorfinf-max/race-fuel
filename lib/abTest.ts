export function tallyVotes(headlineIds: string[]): Record<"a" | "b", number> {
  const counts: Record<"a" | "b", number> = { a: 0, b: 0 };
  for (const id of headlineIds) {
    if (id === "a" || id === "b") counts[id] += 1;
  }
  return counts;
}
