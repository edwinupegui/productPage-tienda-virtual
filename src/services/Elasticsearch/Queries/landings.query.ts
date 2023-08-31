

export const landingsQuery = (landingId: number): any => ({
  must: [
    {
      term: {
        landingId,
      },
    },
  ],
});

export const especificIdsQuery = (productsIds: number[]): any => ({
  must: [
    {
      ids: {
        values: productsIds,
      },
    },
  ],
});
