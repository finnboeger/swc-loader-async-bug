async function a(): Promise<string[]> {
  return [1,2];
}

async function c(x: string[], y: string[]) {
  console.log(...x, ...y);
}

(async () => c(await a(), await a()))().then();
