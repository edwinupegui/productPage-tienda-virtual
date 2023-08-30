export const MostSold = {
  must: [
    {
      range: {
        totalSales: {
          gt: 0,
        },
      },
    },
  ],
};
