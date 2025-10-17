export function random() {
  return Math.random();
}

export function weightedChoice(choices, rnd = random) {
  const total = choices.reduce((s, c) => s + c.weight, 0);
  let r = rnd() * total;
  for (const c of choices) {
    r -= c.weight;
    if (r <= 0) return c.value;
  }
  return choices[choices.length - 1].value;
}