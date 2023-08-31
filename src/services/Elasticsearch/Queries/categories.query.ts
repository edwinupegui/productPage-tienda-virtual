
export const CategoriesQuery = (category: string): any => ({
  must: [
    {
      match: {
        'categories.slug.keyword': category,
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
