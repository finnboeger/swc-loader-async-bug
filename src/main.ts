async function a(): Promise<string[]> {
  return [1,2];
}

async function b(x: string[], y: string[]): Promise<void> {
  console.log(x, y);
  console.log(...x, ...y);
}

(async () => b(await a(), await a()))().then();
