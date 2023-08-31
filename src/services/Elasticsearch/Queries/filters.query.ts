

export const TermFilterQuery = (
  term: string,
  keyword: string
): any => ({
  bool: {
    minimum_should_match: 1,
    should: [
      {
        term: {
          [term]: keyword,
        },
      },
    ],
  },
});

export const RangeFilterQuery = (
  term: string,
  range: { from: number; to: number }
): any => ({
  bool: {
    minimum_should_match: 1,
    should: {
      range: {
        [term]: {
          gte: range.to,
          lt: range.from,
        },
      },
    },
  },
});
