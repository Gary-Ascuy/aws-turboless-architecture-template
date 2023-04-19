export function to<TInput, TOutput>(items: TInput): TOutput {
  return items as unknown as TOutput;
}

export function map<TInput, TOutput>(items: TInput[]): TOutput[] {
  return items as unknown as TOutput[];
}
