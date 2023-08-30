export const bestSales = {
  must: [
    {
      nested: {
        path: 'promotions',
        query: {
          bool: {
            must: [
              {
                range: {
                  'promotions.validFrom': {
                    lte: 'now',
                  },
                },
              },
              {
                range: {
                  'promotions.validTo': {
                    gt: 'now',
                  },
                },
              },
              {
                range: {
                  'promotions.discountValue': {
                    gt: 0,
                  },
                },
              },
            ],
          },
        },
      },
    },
  ],
};
