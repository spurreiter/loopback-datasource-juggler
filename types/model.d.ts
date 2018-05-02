// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback-datasource-juggler
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/// <reference types="node" />

import {AnyObject, Options, Callback, PromiseOrVoid} from './common';
import {DataSource} from './datasource';
import {EventEmitter} from 'events';

// tslint:disable:no-any
// tslint:disable:max-line-length

/**
 * Property types
 */
export type PropertyType =
  | string
  | Function
  | {[property: string]: PropertyType};

/**
 * Property definition
 */
export interface PropertyDefinition extends AnyObject {
  name: string;
  type?: PropertyType;
}

/**
 * Schema definition
 */
export interface Schema {
  name: string;
  properties: {[property: string]: PropertyDefinition};
  settings?: AnyObject;
}

/**
 * ID definition
 */
export interface IdDefinition {
  name: string;
  id: number;
  property: AnyObject;
}

/**
 * Index definition
 */
export interface IndexDefinition extends AnyObject {}

/**
 * Column metadata
 */
export interface ColumnMetadata extends AnyObject {
  name: string;
}

/**
 * Model definition
 */
export declare class ModelDefinition extends EventEmitter implements Schema {
  name: string;
  properties: AnyObject;
  rawProperties: AnyObject;
  settings?: AnyObject;
  relations?: AnyObject[];

  constructor(
    modelBuilder: ModelBuilder | null | undefined,
    name: string,
    properties?: {[name: string]: PropertyDefinition},
    settings?: AnyObject,
  );
  constructor(modelBuilder: ModelBuilder | null | undefined, schema: Schema);

  tableName(connectorType: string): string;
  columnName(connectorType: string, propertyName: string): string;
  columnNames(connectorType: string): string[];
  columnMetadata(connectorType: string, propertyName: string): ColumnMetadata;

  ids(): IdDefinition[];
  idName(): string;
  idNames(): string[];

  defineProperty(
    propertyName: string,
    propertyDefinition: PropertyDefinition,
  ): void;
  indexes(): {[name: string]: IndexDefinition};
  build(forceRebuild?: boolean): AnyObject;
  toJSON(forceRebuild?: boolean): AnyObject;
}

/**
 * Base model class
 */
export declare class ModelBase {
  static dataSource?: DataSource;
  static modelName: string;
  static definition: ModelDefinition;
  static attachTo(ds: DataSource): void;
  constructor(...args: any[]);
  toJSON(): Object;
  toObject(options?: Options): Object;
  [property: string]: any;
}

export type ModelClass = typeof ModelBase;

export declare class ModelBuilder extends EventEmitter {
  static defaultInstance: ModelBuilder;

  models: {[name: string]: ModelClass};
  definitions: {[name: string]: ModelDefinition};
  settings: AnyObject;

  getModel(name: string, forceCreate?: boolean): ModelClass;

  getModelDefinition(name: string): ModelDefinition | undefined;

  define(
    className: string,
    properties?: AnyObject,
    settings?: AnyObject,
    parent?: ModelClass,
  ): ModelClass;

  defineProperty(
    modelName: string,
    propertyName: string,
    propertyDefinition: AnyObject,
  ): void;

  defineValueType(type: string, aliases?: string[]): void;

  extendModel(modelName: string, properties: AnyObject): void;

  getSchemaName(name?: string): string;

  resolveType(type: any): any;

  buildModels(
    schemas: AnyObject,
    createModel?: Function,
  ): {[name: string]: ModelClass};

  buildModelFromInstance(
    name: string,
    json: AnyObject,
    options: Options,
  ): ModelClass;
}

/**
 * Union export type for model instance or plain object representing the model
 * instance
 */
export type ModelData<T extends ModelBase = ModelBase> = T | AnyObject;
