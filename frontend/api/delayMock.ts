//delayMock.ts
// 模拟延迟的加载函数
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
