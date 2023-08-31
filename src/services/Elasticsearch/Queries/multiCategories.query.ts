

export const multiCategoriesQuery = (
  categorys: string[] = [],
  stores: string[] = []
): any => ({
  must: [
    {
      bool: {
        should: [
          ...categorys.map((category) => ({
            term: {
              'categories.slug.keyword': category,
            },
          })),
          ...stores.map((nameStore) => ({
            term: {
              'store.keyword': nameStore,
            },
          })),
        ],

        minimum_should_match: 1,
      },
    },
  ],
  should: [
    {
      match: {
        'categories.slug': {
          query: 'celulares-y-smartphones-celulares-y-telefonos',
          boost: 3,
        },
      },
    },
    {
      match: {
        'categories.slug': {
          query: 'televisores-electronica-audio-y-video',
          boost: 3,
        },
      },
    },
    {
      match: {
        'categories.slug': {
          query: 'portatiles-portatiles-y-accesorios-computacion',
          boost: 2,
        },
      },
    },
  ],
});
