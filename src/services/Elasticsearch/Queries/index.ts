
export const BaseQueryResults = (
  { from, size, sort, must, should = [] }: any,
  restrictions: boolean
): any => ({
  body: {
    from,
    size,
    sort,
    aggs: {},
    query: {
      function_score: {
        functions: [
          {
            field_value_factor: {
              field: 'sellerInfo.rate',
              factor: 1.9,
              modifier: 'sqrt',
              missing: 1,
            },
          },
          {
            field_value_factor: {
              field: 'totalSales',
              factor: 1.2,
              modifier: 'sqrt',
              missing: 1,
            },
          },
          {
            field_value_factor: {
              field: 'priceFilter',
              factor: 0.8,
              modifier: 'sqrt',
              missing: 1,
            },
          },
        ],
        query: {
          bool: {
            must: [
              ...must,
              {
                range: {
                  priceFilter: {
                    gt: 0,
                  },
                },
              },
              {
                bool: {
                  minimum_should_match: 1,
                  should: [
                    {
                      term: {
                        'type.keyword': 'variable',
                      },
                    },
                    {
                      range: {
                        stock: {
                          gt: 0,
                        },
                      },
                    },
                  ],
                },
              },
            ],
            must_not: [
              {
                terms: {
                  'categories.id': [],
                },
              },
              {
                term: {
                  'status.keyword': {
                    value: 'draft',
                  },
                },
              },
              {
                term: {
                  'image.keyword': {
                    value: '',
                  },
                },
              },
              {
                term: {
                  'status.keyword': {
                    value: 'trash',
                  },
                },
              },
              {
                term: {
                  'price.keyword': {
                    value: '',
                  },
                },
              },
              {
                term: {
                  visible: {
                    value: 'false',
                  },
                },
              },
            ],
            should: [
              {
                nested: {
                  path: 'promotions',
                  query: {
                    bool: {
                      minimum_should_match: 1,
                      should: [
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': true,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': true,
                                },
                              },
                              {
                                range: {
                                  'promotions.validFrom': { lte: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.validTo': { gt: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': true,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': false,
                                },
                              },
                              {
                                range: {
                                  'promotions.validFrom': { lte: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': false,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': true,
                                },
                              },
                              {
                                range: {
                                  'promotions.validTo': { gt: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': false,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': false,
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                      ],
                    },
                  },
                },
              },
              ...should,
            ],
          },
        },
      },
    },
  },
});

export const BaseQuerySearchResults = (
  { from, size, sort, must, should = [] }: any,
  restrictions: boolean
): any => ({
  body: {
    from,
    size,
    sort,
    aggs: {},
    query: {
      function_score: {
        functions: [
          {
            field_value_factor: {
              field: 'sellerInfo.rate',
              factor: 1.9,
              modifier: 'sqrt',
              missing: 1,
            },
          },
        ],
        query: {
          bool: {
            must: [
              ...must,
              {
                range: {
                  priceFilter: {
                    gt: 0,
                  },
                },
              },
              {
                bool: {
                  minimum_should_match: 1,
                  should: [
                    {
                      term: {
                        'type.keyword': 'variable',
                      },
                    },
                    {
                      range: {
                        stock: {
                          gt: 0,
                        },
                      },
                    },
                  ],
                },
              },
            ],
            must_not: [
              {
                terms: {
                  'categories.id': [],
                },
              },
              {
                term: {
                  'status.keyword': {
                    value: 'draft',
                  },
                },
              },
              {
                term: {
                  'image.keyword': {
                    value: '',
                  },
                },
              },
              {
                term: {
                  'status.keyword': {
                    value: 'trash',
                  },
                },
              },
              {
                term: {
                  'price.keyword': {
                    value: '',
                  },
                },
              },
              {
                term: {
                  visible: {
                    value: 'false',
                  },
                },
              },
            ],
            should: [
              {
                nested: {
                  path: 'promotions',
                  query: {
                    bool: {
                      minimum_should_match: 1,
                      should: [
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': true,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': true,
                                },
                              },
                              {
                                range: {
                                  'promotions.validFrom': { lte: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.validTo': { gt: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': true,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': false,
                                },
                              },
                              {
                                range: {
                                  'promotions.validFrom': { lte: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': false,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': true,
                                },
                              },
                              {
                                range: {
                                  'promotions.validTo': { gt: 'now' },
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                        {
                          bool: {
                            must: [
                              {
                                match: {
                                  'promotions.definedFromPromotion': false,
                                },
                              },
                              {
                                match: {
                                  'promotions.definedToPromotion': false,
                                },
                              },
                              {
                                range: {
                                  'promotions.discountValue': { gt: 0 },
                                },
                              },
                            ],
                            boost: 3,
                          },
                        },
                      ],
                    },
                  },
                },
              },
              ...should,
            ],
          },
        },
      },
    },
  },
});
