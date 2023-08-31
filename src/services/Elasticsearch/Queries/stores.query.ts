

export const StoresQuery = (storeId: number): any => ({
  must: [
    {
      term: {
        storeId,
      },
    },
  ],
});
