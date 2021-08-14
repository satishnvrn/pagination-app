const paginatedDataCache: Record<string, any[]> = {};

/*
  1. We are storing the result of the paginated data for a given pageNo and size in a 
     variable to cache it for future use.
  2. This method takes 3 arguments: data, pageNo(starting from 1), size
  3. If the data exists in the paginatedDataCache, it will return the data from cache.
  4. If it doesn't exist in the cache, it will sort the data and splice 
     from (pageNo - 1) * size and the length of the array will be size.
*/
export const getPaginatedData = (data: any[], pageNo: number, size: number) => {
  if(!paginatedDataCache[`pageNo${pageNo}size${size}`]) {
    paginatedDataCache[`pageNo${pageNo}size${size}`] = data.sort().slice((pageNo - 1) * size, pageNo * size);
  }
  return paginatedDataCache[`pageNo${pageNo}size${size}`];
}