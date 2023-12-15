export type ODataFilter = {
  [key: string]: ODataFilterData;
};

export type ODataFilterData = ODataFilterValue | ODataFilterOperation[];

type ODataFilterOperation =
  | [ODataOperators.AsRaw, string]
  | [ODataOperators, ODataFilterValue | ODataFilterValue[]]
  | [ODataOperators, ODataFilterValue | ODataFilterValue[], ODataOperators.Or];

export type ODataFilterValue = string | number | Date | Guid | boolean | undefined | null;
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
  In = 'in',
  Contains = 'contains',
  AsRaw = '_ar',
  BetweenInclusive = '_bti',
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

export class Guid {
  private _inner: string;

  get inner(): string {
    return this._inner;
  }

  constructor(guid: string) {
    this._inner = guid;
  }
}
