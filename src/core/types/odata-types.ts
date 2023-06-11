export type ODataFilter = {
  [key: string]: ODataFilterValue | [ODataOperators, ODataFilterValue][];
};

export type ODataFilterValue = string | number | Date | boolean | undefined | null;
export type ODataOrderBy = [string | string[], 'asc' | 'desc'];
export enum ODataOperators {
  EqualTo = 'eq',
  NotEqualTo = 'ne',
  GreaterThan = 'gt',
  GreaterThanOrEqualTo = 'ge',
  LessThan = 'lt',
  LessThanOrEqualTo = 'le',
  And = 'and',
  Or = 'or',
  Not = 'not',
  Contains = 'contains',
}

export type ODataOptions = {
  select?: string[];
  expand?: string[];
  filter?: ODataFilter;
  top?: number;
  skip?: number;
  orderBy?: ODataOrderBy | ODataOrderBy[];
  count?: boolean;
};

export type ODataParams = Partial<{
  $select: string;
  $expand: string;
  $filter: string;
  $top: string;
  $skip: string;
  $orderby: string;
  $count: string;
}>;
