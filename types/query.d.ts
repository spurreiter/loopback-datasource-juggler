// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback-datasource-juggler
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {AnyObject} from './common';

// tslint:disable:no-any

/**
 * Operators for where clauses
 */
export declare enum Operators {
  eq = 'eq', // Equal
  neq = 'neq', // Not Equal
  gt = 'ge', // >
  gte = 'gte', // >=
  lt = 'lt', // <
  lte = 'lte', // <=
  inq = 'inq', // IN
  between = 'between', // BETWEEN [val1, val2]
  exists = 'exists',
  and = 'and', // AND
  or = 'or', // OR
}

/**
 * Matching criteria
 */
export interface Condition {
  eq?: any;
  neq?: any;
  gt?: any;
  gte?: any;
  lt?: any;
  lte?: any;
  inq?: any[];
  between?: any[];
  exists?: boolean;
  and?: Where[];
  or?: Where[];
}

/**
 * Where object
 */
export interface Where {
  and?: Where[]; // AND
  or?: Where[]; // OR
  [property: string]: Condition | any;
}

/**
 * Selection of fields
 */
export interface Fields {
  [property: string]: boolean;
}

/**
 * Inclusion of related items
 */
export interface Inclusion {
  relation: string;
  scope?: Filter;
}

/**
 * Query filter object
 */
export interface Filter {
  where?: Where;
  fields?: string | string[] | Fields;
  order?: string | string[];
  limit?: number;
  skip?: number;
  offset?: number;
  include?: string | string[] | Inclusion[];
}
