const input: number = 10;

//complexity: O(n)
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;

  return sum;
}

//complexity: O(n)
function sum_to_n_b(n: number): number {
  if (n === 0) return 0; //stop condition
  return n + sum_to_n_b(n - 1); // recursive
}

//complexity: O(1)
function sum_to_n_c(n: number): number {
  return (n * (n + 1)) / 2; // formula
}

export function problem4() {
  console.log("Problem 4:");
  console.log(sum_to_n_a(input));
  console.log(sum_to_n_b(input));
  console.log(sum_to_n_c(input));
}
