export interface CategoryIndex {
  id: number;
  name: string;
  slug: string;
  quantity: number;
  image: string;
  parendId: number;
  level: number;
  childrens: CategoryIndex[];
}

export interface CategoryFilters {
  id: number;
  name: string;
  slug: string;
  quantity: number;
  image: string;
  parendId: number;
  level: number;
}
