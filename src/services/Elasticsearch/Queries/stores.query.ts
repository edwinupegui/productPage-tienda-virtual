import { Results } from '@components/organisms/Results';

export const StoresQuery = (storeId: number): Results => ({
  must: [
    {
      term: {
        storeId,
      },
    },
  ],
});
