const paginatedDataCache: Record<string, any[]> = {};

export const getPaginatedData = (data: any[], pageNo: number, size: number) => {
  if(!paginatedDataCache[`pageNo${pageNo}size${size}`]) {
    paginatedDataCache[`pageNo${pageNo}size${size}`] = data.sort().slice((pageNo - 1) * size, pageNo * size);
  }
  return paginatedDataCache[`pageNo${pageNo}size${size}`];
}