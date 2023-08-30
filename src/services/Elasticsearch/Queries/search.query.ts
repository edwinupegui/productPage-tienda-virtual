import { Results } from '@components/organisms/Results';

export const PrincipalSearchQuery = (query: string): Results => ({
  must: [
    {
      multi_match: {
        query,
        type: 'most_fields',
        fields: ['name^4', 'description^3', 'categories', 'sku'],
        operator: 'or',
        fuzziness: 1,
        fuzzy_transpositions: true,
      },
    },
  ],
});
