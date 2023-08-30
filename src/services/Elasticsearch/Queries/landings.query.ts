import { Results } from '@components/organisms/Results';

export const landingsQuery = (landingId: number): Results => ({
  must: [
    {
      term: {
        landingId,
      },
    },
  ],
});

export const especificIdsQuery = (productsIds: number[]): Results => ({
  must: [
    {
      ids: {
        values: productsIds,
      },
    },
  ],
});
