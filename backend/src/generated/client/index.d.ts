
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model CareerPage
 * 
 */
export type CareerPage = $Result.DefaultSelection<Prisma.$CareerPagePayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Skill
 * 
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>
/**
 * Model JobSkill
 * 
 */
export type JobSkill = $Result.DefaultSelection<Prisma.$JobSkillPayload>
/**
 * Model CrawlLog
 * 
 */
export type CrawlLog = $Result.DefaultSelection<Prisma.$CrawlLogPayload>
/**
 * Model CrawlQueue
 * 
 */
export type CrawlQueue = $Result.DefaultSelection<Prisma.$CrawlQueuePayload>
/**
 * Model CompanySource
 * 
 */
export type CompanySource = $Result.DefaultSelection<Prisma.$CompanySourcePayload>
/**
 * Model CompanyAlias
 * 
 */
export type CompanyAlias = $Result.DefaultSelection<Prisma.$CompanyAliasPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs>;

  /**
   * `prisma.careerPage`: Exposes CRUD operations for the **CareerPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerPages
    * const careerPages = await prisma.careerPage.findMany()
    * ```
    */
  get careerPage(): Prisma.CareerPageDelegate<ExtArgs>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.SkillDelegate<ExtArgs>;

  /**
   * `prisma.jobSkill`: Exposes CRUD operations for the **JobSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobSkills
    * const jobSkills = await prisma.jobSkill.findMany()
    * ```
    */
  get jobSkill(): Prisma.JobSkillDelegate<ExtArgs>;

  /**
   * `prisma.crawlLog`: Exposes CRUD operations for the **CrawlLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CrawlLogs
    * const crawlLogs = await prisma.crawlLog.findMany()
    * ```
    */
  get crawlLog(): Prisma.CrawlLogDelegate<ExtArgs>;

  /**
   * `prisma.crawlQueue`: Exposes CRUD operations for the **CrawlQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CrawlQueues
    * const crawlQueues = await prisma.crawlQueue.findMany()
    * ```
    */
  get crawlQueue(): Prisma.CrawlQueueDelegate<ExtArgs>;

  /**
   * `prisma.companySource`: Exposes CRUD operations for the **CompanySource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanySources
    * const companySources = await prisma.companySource.findMany()
    * ```
    */
  get companySource(): Prisma.CompanySourceDelegate<ExtArgs>;

  /**
   * `prisma.companyAlias`: Exposes CRUD operations for the **CompanyAlias** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyAliases
    * const companyAliases = await prisma.companyAlias.findMany()
    * ```
    */
  get companyAlias(): Prisma.CompanyAliasDelegate<ExtArgs>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    CareerPage: 'CareerPage',
    Job: 'Job',
    Skill: 'Skill',
    JobSkill: 'JobSkill',
    CrawlLog: 'CrawlLog',
    CrawlQueue: 'CrawlQueue',
    CompanySource: 'CompanySource',
    CompanyAlias: 'CompanyAlias',
    Settings: 'Settings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "company" | "careerPage" | "job" | "skill" | "jobSkill" | "crawlLog" | "crawlQueue" | "companySource" | "companyAlias" | "settings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      CareerPage: {
        payload: Prisma.$CareerPagePayload<ExtArgs>
        fields: Prisma.CareerPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>
          }
          findFirst: {
            args: Prisma.CareerPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>
          }
          findMany: {
            args: Prisma.CareerPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>[]
          }
          create: {
            args: Prisma.CareerPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>
          }
          createMany: {
            args: Prisma.CareerPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerPageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>[]
          }
          delete: {
            args: Prisma.CareerPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>
          }
          update: {
            args: Prisma.CareerPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>
          }
          deleteMany: {
            args: Prisma.CareerPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareerPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerPagePayload>
          }
          aggregate: {
            args: Prisma.CareerPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerPage>
          }
          groupBy: {
            args: Prisma.CareerPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerPageCountArgs<ExtArgs>
            result: $Utils.Optional<CareerPageCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>
        fields: Prisma.SkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      JobSkill: {
        payload: Prisma.$JobSkillPayload<ExtArgs>
        fields: Prisma.JobSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>
          }
          findFirst: {
            args: Prisma.JobSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>
          }
          findMany: {
            args: Prisma.JobSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>[]
          }
          create: {
            args: Prisma.JobSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>
          }
          createMany: {
            args: Prisma.JobSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobSkillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>[]
          }
          delete: {
            args: Prisma.JobSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>
          }
          update: {
            args: Prisma.JobSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>
          }
          deleteMany: {
            args: Prisma.JobSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSkillPayload>
          }
          aggregate: {
            args: Prisma.JobSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobSkill>
          }
          groupBy: {
            args: Prisma.JobSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobSkillCountArgs<ExtArgs>
            result: $Utils.Optional<JobSkillCountAggregateOutputType> | number
          }
        }
      }
      CrawlLog: {
        payload: Prisma.$CrawlLogPayload<ExtArgs>
        fields: Prisma.CrawlLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>
          }
          findFirst: {
            args: Prisma.CrawlLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>
          }
          findMany: {
            args: Prisma.CrawlLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>[]
          }
          create: {
            args: Prisma.CrawlLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>
          }
          createMany: {
            args: Prisma.CrawlLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrawlLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>[]
          }
          delete: {
            args: Prisma.CrawlLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>
          }
          update: {
            args: Prisma.CrawlLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>
          }
          deleteMany: {
            args: Prisma.CrawlLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CrawlLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlLogPayload>
          }
          aggregate: {
            args: Prisma.CrawlLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrawlLog>
          }
          groupBy: {
            args: Prisma.CrawlLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrawlLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlLogCountArgs<ExtArgs>
            result: $Utils.Optional<CrawlLogCountAggregateOutputType> | number
          }
        }
      }
      CrawlQueue: {
        payload: Prisma.$CrawlQueuePayload<ExtArgs>
        fields: Prisma.CrawlQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>
          }
          findFirst: {
            args: Prisma.CrawlQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>
          }
          findMany: {
            args: Prisma.CrawlQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>[]
          }
          create: {
            args: Prisma.CrawlQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>
          }
          createMany: {
            args: Prisma.CrawlQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrawlQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>[]
          }
          delete: {
            args: Prisma.CrawlQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>
          }
          update: {
            args: Prisma.CrawlQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>
          }
          deleteMany: {
            args: Prisma.CrawlQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CrawlQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlQueuePayload>
          }
          aggregate: {
            args: Prisma.CrawlQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrawlQueue>
          }
          groupBy: {
            args: Prisma.CrawlQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrawlQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlQueueCountArgs<ExtArgs>
            result: $Utils.Optional<CrawlQueueCountAggregateOutputType> | number
          }
        }
      }
      CompanySource: {
        payload: Prisma.$CompanySourcePayload<ExtArgs>
        fields: Prisma.CompanySourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanySourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanySourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>
          }
          findFirst: {
            args: Prisma.CompanySourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanySourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>
          }
          findMany: {
            args: Prisma.CompanySourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>[]
          }
          create: {
            args: Prisma.CompanySourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>
          }
          createMany: {
            args: Prisma.CompanySourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanySourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>[]
          }
          delete: {
            args: Prisma.CompanySourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>
          }
          update: {
            args: Prisma.CompanySourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>
          }
          deleteMany: {
            args: Prisma.CompanySourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanySourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanySourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanySourcePayload>
          }
          aggregate: {
            args: Prisma.CompanySourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanySource>
          }
          groupBy: {
            args: Prisma.CompanySourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanySourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanySourceCountArgs<ExtArgs>
            result: $Utils.Optional<CompanySourceCountAggregateOutputType> | number
          }
        }
      }
      CompanyAlias: {
        payload: Prisma.$CompanyAliasPayload<ExtArgs>
        fields: Prisma.CompanyAliasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyAliasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyAliasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>
          }
          findFirst: {
            args: Prisma.CompanyAliasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyAliasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>
          }
          findMany: {
            args: Prisma.CompanyAliasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>[]
          }
          create: {
            args: Prisma.CompanyAliasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>
          }
          createMany: {
            args: Prisma.CompanyAliasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyAliasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>[]
          }
          delete: {
            args: Prisma.CompanyAliasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>
          }
          update: {
            args: Prisma.CompanyAliasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>
          }
          deleteMany: {
            args: Prisma.CompanyAliasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyAliasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyAliasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyAliasPayload>
          }
          aggregate: {
            args: Prisma.CompanyAliasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyAlias>
          }
          groupBy: {
            args: Prisma.CompanyAliasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyAliasGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyAliasCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyAliasCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    jobs: number
    crawlLogs: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
    crawlLogs?: boolean | CompanyCountOutputTypeCountCrawlLogsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountCrawlLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlLogWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    jobSkills: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobSkills?: boolean | JobCountOutputTypeCountJobSkillsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountJobSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSkillWhereInput
  }


  /**
   * Count Type SkillCountOutputType
   */

  export type SkillCountOutputType = {
    jobSkills: number
  }

  export type SkillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobSkills?: boolean | SkillCountOutputTypeCountJobSkillsArgs
  }

  // Custom InputTypes
  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillCountOutputType
     */
    select?: SkillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountJobSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSkillWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    priorityScore: number | null
  }

  export type CompanySumAggregateOutputType = {
    priorityScore: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    careerPageUrl: string | null
    sourceType: string | null
    atsProvider: string | null
    crawlFrequency: string | null
    lastSuccessfulCrawl: Date | null
    apiEndpoint: string | null
    sourceFingerprint: string | null
    createdAt: Date | null
    updatedAt: Date | null
    website: string | null
    industry: string | null
    country: string | null
    github: string | null
    linkedin: string | null
    crunchbase: string | null
    lastChecked: Date | null
    status: string | null
    priorityScore: number | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    careerPageUrl: string | null
    sourceType: string | null
    atsProvider: string | null
    crawlFrequency: string | null
    lastSuccessfulCrawl: Date | null
    apiEndpoint: string | null
    sourceFingerprint: string | null
    createdAt: Date | null
    updatedAt: Date | null
    website: string | null
    industry: string | null
    country: string | null
    github: string | null
    linkedin: string | null
    crunchbase: string | null
    lastChecked: Date | null
    status: string | null
    priorityScore: number | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    careerPageUrl: number
    sourceType: number
    atsProvider: number
    crawlFrequency: number
    lastSuccessfulCrawl: number
    apiEndpoint: number
    sourceFingerprint: number
    createdAt: number
    updatedAt: number
    website: number
    industry: number
    country: number
    github: number
    linkedin: number
    crunchbase: number
    lastChecked: number
    status: number
    priorityScore: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    priorityScore?: true
  }

  export type CompanySumAggregateInputType = {
    priorityScore?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    careerPageUrl?: true
    sourceType?: true
    atsProvider?: true
    crawlFrequency?: true
    lastSuccessfulCrawl?: true
    apiEndpoint?: true
    sourceFingerprint?: true
    createdAt?: true
    updatedAt?: true
    website?: true
    industry?: true
    country?: true
    github?: true
    linkedin?: true
    crunchbase?: true
    lastChecked?: true
    status?: true
    priorityScore?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    careerPageUrl?: true
    sourceType?: true
    atsProvider?: true
    crawlFrequency?: true
    lastSuccessfulCrawl?: true
    apiEndpoint?: true
    sourceFingerprint?: true
    createdAt?: true
    updatedAt?: true
    website?: true
    industry?: true
    country?: true
    github?: true
    linkedin?: true
    crunchbase?: true
    lastChecked?: true
    status?: true
    priorityScore?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    careerPageUrl?: true
    sourceType?: true
    atsProvider?: true
    crawlFrequency?: true
    lastSuccessfulCrawl?: true
    apiEndpoint?: true
    sourceFingerprint?: true
    createdAt?: true
    updatedAt?: true
    website?: true
    industry?: true
    country?: true
    github?: true
    linkedin?: true
    crunchbase?: true
    lastChecked?: true
    status?: true
    priorityScore?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider: string | null
    crawlFrequency: string
    lastSuccessfulCrawl: Date | null
    apiEndpoint: string | null
    sourceFingerprint: string | null
    createdAt: Date
    updatedAt: Date
    website: string | null
    industry: string | null
    country: string | null
    github: string | null
    linkedin: string | null
    crunchbase: string | null
    lastChecked: Date | null
    status: string
    priorityScore: number
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    careerPageUrl?: boolean
    sourceType?: boolean
    atsProvider?: boolean
    crawlFrequency?: boolean
    lastSuccessfulCrawl?: boolean
    apiEndpoint?: boolean
    sourceFingerprint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    website?: boolean
    industry?: boolean
    country?: boolean
    github?: boolean
    linkedin?: boolean
    crunchbase?: boolean
    lastChecked?: boolean
    status?: boolean
    priorityScore?: boolean
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    crawlLogs?: boolean | Company$crawlLogsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    careerPageUrl?: boolean
    sourceType?: boolean
    atsProvider?: boolean
    crawlFrequency?: boolean
    lastSuccessfulCrawl?: boolean
    apiEndpoint?: boolean
    sourceFingerprint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    website?: boolean
    industry?: boolean
    country?: boolean
    github?: boolean
    linkedin?: boolean
    crunchbase?: boolean
    lastChecked?: boolean
    status?: boolean
    priorityScore?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    careerPageUrl?: boolean
    sourceType?: boolean
    atsProvider?: boolean
    crawlFrequency?: boolean
    lastSuccessfulCrawl?: boolean
    apiEndpoint?: boolean
    sourceFingerprint?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    website?: boolean
    industry?: boolean
    country?: boolean
    github?: boolean
    linkedin?: boolean
    crunchbase?: boolean
    lastChecked?: boolean
    status?: boolean
    priorityScore?: boolean
  }

  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | Company$jobsArgs<ExtArgs>
    crawlLogs?: boolean | Company$crawlLogsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      jobs: Prisma.$JobPayload<ExtArgs>[]
      crawlLogs: Prisma.$CrawlLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      careerPageUrl: string
      sourceType: string
      atsProvider: string | null
      crawlFrequency: string
      lastSuccessfulCrawl: Date | null
      apiEndpoint: string | null
      sourceFingerprint: string | null
      createdAt: Date
      updatedAt: Date
      website: string | null
      industry: string | null
      country: string | null
      github: string | null
      linkedin: string | null
      crunchbase: string | null
      lastChecked: Date | null
      status: string
      priorityScore: number
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobs<T extends Company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany"> | Null>
    crawlLogs<T extends Company$crawlLogsArgs<ExtArgs> = {}>(args?: Subset<T, Company$crawlLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */ 
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly careerPageUrl: FieldRef<"Company", 'String'>
    readonly sourceType: FieldRef<"Company", 'String'>
    readonly atsProvider: FieldRef<"Company", 'String'>
    readonly crawlFrequency: FieldRef<"Company", 'String'>
    readonly lastSuccessfulCrawl: FieldRef<"Company", 'DateTime'>
    readonly apiEndpoint: FieldRef<"Company", 'String'>
    readonly sourceFingerprint: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
    readonly website: FieldRef<"Company", 'String'>
    readonly industry: FieldRef<"Company", 'String'>
    readonly country: FieldRef<"Company", 'String'>
    readonly github: FieldRef<"Company", 'String'>
    readonly linkedin: FieldRef<"Company", 'String'>
    readonly crunchbase: FieldRef<"Company", 'String'>
    readonly lastChecked: FieldRef<"Company", 'DateTime'>
    readonly status: FieldRef<"Company", 'String'>
    readonly priorityScore: FieldRef<"Company", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
  }

  /**
   * Company.jobs
   */
  export type Company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Company.crawlLogs
   */
  export type Company$crawlLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    where?: CrawlLogWhereInput
    orderBy?: CrawlLogOrderByWithRelationInput | CrawlLogOrderByWithRelationInput[]
    cursor?: CrawlLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrawlLogScalarFieldEnum | CrawlLogScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model CareerPage
   */

  export type AggregateCareerPage = {
    _count: CareerPageCountAggregateOutputType | null
    _avg: CareerPageAvgAggregateOutputType | null
    _sum: CareerPageSumAggregateOutputType | null
    _min: CareerPageMinAggregateOutputType | null
    _max: CareerPageMaxAggregateOutputType | null
  }

  export type CareerPageAvgAggregateOutputType = {
    confidence: number | null
  }

  export type CareerPageSumAggregateOutputType = {
    confidence: number | null
  }

  export type CareerPageMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    careerUrl: string | null
    confidence: number | null
    foundBy: string | null
    date: Date | null
  }

  export type CareerPageMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    careerUrl: string | null
    confidence: number | null
    foundBy: string | null
    date: Date | null
  }

  export type CareerPageCountAggregateOutputType = {
    id: number
    companyId: number
    careerUrl: number
    confidence: number
    foundBy: number
    date: number
    _all: number
  }


  export type CareerPageAvgAggregateInputType = {
    confidence?: true
  }

  export type CareerPageSumAggregateInputType = {
    confidence?: true
  }

  export type CareerPageMinAggregateInputType = {
    id?: true
    companyId?: true
    careerUrl?: true
    confidence?: true
    foundBy?: true
    date?: true
  }

  export type CareerPageMaxAggregateInputType = {
    id?: true
    companyId?: true
    careerUrl?: true
    confidence?: true
    foundBy?: true
    date?: true
  }

  export type CareerPageCountAggregateInputType = {
    id?: true
    companyId?: true
    careerUrl?: true
    confidence?: true
    foundBy?: true
    date?: true
    _all?: true
  }

  export type CareerPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerPage to aggregate.
     */
    where?: CareerPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerPages to fetch.
     */
    orderBy?: CareerPageOrderByWithRelationInput | CareerPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerPages
    **/
    _count?: true | CareerPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CareerPageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CareerPageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerPageMaxAggregateInputType
  }

  export type GetCareerPageAggregateType<T extends CareerPageAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerPage[P]>
      : GetScalarType<T[P], AggregateCareerPage[P]>
  }




  export type CareerPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerPageWhereInput
    orderBy?: CareerPageOrderByWithAggregationInput | CareerPageOrderByWithAggregationInput[]
    by: CareerPageScalarFieldEnum[] | CareerPageScalarFieldEnum
    having?: CareerPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerPageCountAggregateInputType | true
    _avg?: CareerPageAvgAggregateInputType
    _sum?: CareerPageSumAggregateInputType
    _min?: CareerPageMinAggregateInputType
    _max?: CareerPageMaxAggregateInputType
  }

  export type CareerPageGroupByOutputType = {
    id: string
    companyId: string
    careerUrl: string
    confidence: number
    foundBy: string
    date: Date
    _count: CareerPageCountAggregateOutputType | null
    _avg: CareerPageAvgAggregateOutputType | null
    _sum: CareerPageSumAggregateOutputType | null
    _min: CareerPageMinAggregateOutputType | null
    _max: CareerPageMaxAggregateOutputType | null
  }

  type GetCareerPageGroupByPayload<T extends CareerPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerPageGroupByOutputType[P]>
            : GetScalarType<T[P], CareerPageGroupByOutputType[P]>
        }
      >
    >


  export type CareerPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    careerUrl?: boolean
    confidence?: boolean
    foundBy?: boolean
    date?: boolean
  }, ExtArgs["result"]["careerPage"]>

  export type CareerPageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    careerUrl?: boolean
    confidence?: boolean
    foundBy?: boolean
    date?: boolean
  }, ExtArgs["result"]["careerPage"]>

  export type CareerPageSelectScalar = {
    id?: boolean
    companyId?: boolean
    careerUrl?: boolean
    confidence?: boolean
    foundBy?: boolean
    date?: boolean
  }


  export type $CareerPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerPage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      careerUrl: string
      confidence: number
      foundBy: string
      date: Date
    }, ExtArgs["result"]["careerPage"]>
    composites: {}
  }

  type CareerPageGetPayload<S extends boolean | null | undefined | CareerPageDefaultArgs> = $Result.GetResult<Prisma.$CareerPagePayload, S>

  type CareerPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerPageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareerPageCountAggregateInputType | true
    }

  export interface CareerPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerPage'], meta: { name: 'CareerPage' } }
    /**
     * Find zero or one CareerPage that matches the filter.
     * @param {CareerPageFindUniqueArgs} args - Arguments to find a CareerPage
     * @example
     * // Get one CareerPage
     * const careerPage = await prisma.careerPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerPageFindUniqueArgs>(args: SelectSubset<T, CareerPageFindUniqueArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CareerPage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareerPageFindUniqueOrThrowArgs} args - Arguments to find a CareerPage
     * @example
     * // Get one CareerPage
     * const careerPage = await prisma.careerPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerPageFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CareerPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageFindFirstArgs} args - Arguments to find a CareerPage
     * @example
     * // Get one CareerPage
     * const careerPage = await prisma.careerPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerPageFindFirstArgs>(args?: SelectSubset<T, CareerPageFindFirstArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CareerPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageFindFirstOrThrowArgs} args - Arguments to find a CareerPage
     * @example
     * // Get one CareerPage
     * const careerPage = await prisma.careerPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerPageFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CareerPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerPages
     * const careerPages = await prisma.careerPage.findMany()
     * 
     * // Get first 10 CareerPages
     * const careerPages = await prisma.careerPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerPageWithIdOnly = await prisma.careerPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerPageFindManyArgs>(args?: SelectSubset<T, CareerPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CareerPage.
     * @param {CareerPageCreateArgs} args - Arguments to create a CareerPage.
     * @example
     * // Create one CareerPage
     * const CareerPage = await prisma.careerPage.create({
     *   data: {
     *     // ... data to create a CareerPage
     *   }
     * })
     * 
     */
    create<T extends CareerPageCreateArgs>(args: SelectSubset<T, CareerPageCreateArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CareerPages.
     * @param {CareerPageCreateManyArgs} args - Arguments to create many CareerPages.
     * @example
     * // Create many CareerPages
     * const careerPage = await prisma.careerPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerPageCreateManyArgs>(args?: SelectSubset<T, CareerPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerPages and returns the data saved in the database.
     * @param {CareerPageCreateManyAndReturnArgs} args - Arguments to create many CareerPages.
     * @example
     * // Create many CareerPages
     * const careerPage = await prisma.careerPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerPages and only return the `id`
     * const careerPageWithIdOnly = await prisma.careerPage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerPageCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerPageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CareerPage.
     * @param {CareerPageDeleteArgs} args - Arguments to delete one CareerPage.
     * @example
     * // Delete one CareerPage
     * const CareerPage = await prisma.careerPage.delete({
     *   where: {
     *     // ... filter to delete one CareerPage
     *   }
     * })
     * 
     */
    delete<T extends CareerPageDeleteArgs>(args: SelectSubset<T, CareerPageDeleteArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CareerPage.
     * @param {CareerPageUpdateArgs} args - Arguments to update one CareerPage.
     * @example
     * // Update one CareerPage
     * const careerPage = await prisma.careerPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerPageUpdateArgs>(args: SelectSubset<T, CareerPageUpdateArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CareerPages.
     * @param {CareerPageDeleteManyArgs} args - Arguments to filter CareerPages to delete.
     * @example
     * // Delete a few CareerPages
     * const { count } = await prisma.careerPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerPageDeleteManyArgs>(args?: SelectSubset<T, CareerPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerPages
     * const careerPage = await prisma.careerPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerPageUpdateManyArgs>(args: SelectSubset<T, CareerPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CareerPage.
     * @param {CareerPageUpsertArgs} args - Arguments to update or create a CareerPage.
     * @example
     * // Update or create a CareerPage
     * const careerPage = await prisma.careerPage.upsert({
     *   create: {
     *     // ... data to create a CareerPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerPage we want to update
     *   }
     * })
     */
    upsert<T extends CareerPageUpsertArgs>(args: SelectSubset<T, CareerPageUpsertArgs<ExtArgs>>): Prisma__CareerPageClient<$Result.GetResult<Prisma.$CareerPagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CareerPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageCountArgs} args - Arguments to filter CareerPages to count.
     * @example
     * // Count the number of CareerPages
     * const count = await prisma.careerPage.count({
     *   where: {
     *     // ... the filter for the CareerPages we want to count
     *   }
     * })
    **/
    count<T extends CareerPageCountArgs>(
      args?: Subset<T, CareerPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerPageAggregateArgs>(args: Subset<T, CareerPageAggregateArgs>): Prisma.PrismaPromise<GetCareerPageAggregateType<T>>

    /**
     * Group by CareerPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerPageGroupByArgs['orderBy'] }
        : { orderBy?: CareerPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerPage model
   */
  readonly fields: CareerPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerPage model
   */ 
  interface CareerPageFieldRefs {
    readonly id: FieldRef<"CareerPage", 'String'>
    readonly companyId: FieldRef<"CareerPage", 'String'>
    readonly careerUrl: FieldRef<"CareerPage", 'String'>
    readonly confidence: FieldRef<"CareerPage", 'Float'>
    readonly foundBy: FieldRef<"CareerPage", 'String'>
    readonly date: FieldRef<"CareerPage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareerPage findUnique
   */
  export type CareerPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * Filter, which CareerPage to fetch.
     */
    where: CareerPageWhereUniqueInput
  }

  /**
   * CareerPage findUniqueOrThrow
   */
  export type CareerPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * Filter, which CareerPage to fetch.
     */
    where: CareerPageWhereUniqueInput
  }

  /**
   * CareerPage findFirst
   */
  export type CareerPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * Filter, which CareerPage to fetch.
     */
    where?: CareerPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerPages to fetch.
     */
    orderBy?: CareerPageOrderByWithRelationInput | CareerPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerPages.
     */
    cursor?: CareerPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerPages.
     */
    distinct?: CareerPageScalarFieldEnum | CareerPageScalarFieldEnum[]
  }

  /**
   * CareerPage findFirstOrThrow
   */
  export type CareerPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * Filter, which CareerPage to fetch.
     */
    where?: CareerPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerPages to fetch.
     */
    orderBy?: CareerPageOrderByWithRelationInput | CareerPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerPages.
     */
    cursor?: CareerPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerPages.
     */
    distinct?: CareerPageScalarFieldEnum | CareerPageScalarFieldEnum[]
  }

  /**
   * CareerPage findMany
   */
  export type CareerPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * Filter, which CareerPages to fetch.
     */
    where?: CareerPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerPages to fetch.
     */
    orderBy?: CareerPageOrderByWithRelationInput | CareerPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerPages.
     */
    cursor?: CareerPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerPages.
     */
    skip?: number
    distinct?: CareerPageScalarFieldEnum | CareerPageScalarFieldEnum[]
  }

  /**
   * CareerPage create
   */
  export type CareerPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * The data needed to create a CareerPage.
     */
    data: XOR<CareerPageCreateInput, CareerPageUncheckedCreateInput>
  }

  /**
   * CareerPage createMany
   */
  export type CareerPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerPages.
     */
    data: CareerPageCreateManyInput | CareerPageCreateManyInput[]
  }

  /**
   * CareerPage createManyAndReturn
   */
  export type CareerPageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CareerPages.
     */
    data: CareerPageCreateManyInput | CareerPageCreateManyInput[]
  }

  /**
   * CareerPage update
   */
  export type CareerPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * The data needed to update a CareerPage.
     */
    data: XOR<CareerPageUpdateInput, CareerPageUncheckedUpdateInput>
    /**
     * Choose, which CareerPage to update.
     */
    where: CareerPageWhereUniqueInput
  }

  /**
   * CareerPage updateMany
   */
  export type CareerPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerPages.
     */
    data: XOR<CareerPageUpdateManyMutationInput, CareerPageUncheckedUpdateManyInput>
    /**
     * Filter which CareerPages to update
     */
    where?: CareerPageWhereInput
  }

  /**
   * CareerPage upsert
   */
  export type CareerPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * The filter to search for the CareerPage to update in case it exists.
     */
    where: CareerPageWhereUniqueInput
    /**
     * In case the CareerPage found by the `where` argument doesn't exist, create a new CareerPage with this data.
     */
    create: XOR<CareerPageCreateInput, CareerPageUncheckedCreateInput>
    /**
     * In case the CareerPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerPageUpdateInput, CareerPageUncheckedUpdateInput>
  }

  /**
   * CareerPage delete
   */
  export type CareerPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
    /**
     * Filter which CareerPage to delete.
     */
    where: CareerPageWhereUniqueInput
  }

  /**
   * CareerPage deleteMany
   */
  export type CareerPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerPages to delete
     */
    where?: CareerPageWhereInput
  }

  /**
   * CareerPage without action
   */
  export type CareerPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerPage
     */
    select?: CareerPageSelect<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    companyName: string | null
    jobId: string | null
    title: string | null
    location: string | null
    employmentType: string | null
    postedTimestamp: Date | null
    description: string | null
    url: string | null
    source: string | null
    hash: string | null
    firstSeen: Date | null
    lastSeen: Date | null
    status: string | null
    embedding: string | null
    remote: boolean | null
    salary: string | null
    department: string | null
    skills: string | null
    experience: string | null
    llmProcessed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    companyName: string | null
    jobId: string | null
    title: string | null
    location: string | null
    employmentType: string | null
    postedTimestamp: Date | null
    description: string | null
    url: string | null
    source: string | null
    hash: string | null
    firstSeen: Date | null
    lastSeen: Date | null
    status: string | null
    embedding: string | null
    remote: boolean | null
    salary: string | null
    department: string | null
    skills: string | null
    experience: string | null
    llmProcessed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    companyId: number
    companyName: number
    jobId: number
    title: number
    location: number
    employmentType: number
    postedTimestamp: number
    description: number
    url: number
    source: number
    hash: number
    firstSeen: number
    lastSeen: number
    status: number
    embedding: number
    remote: number
    salary: number
    department: number
    skills: number
    experience: number
    llmProcessed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobMinAggregateInputType = {
    id?: true
    companyId?: true
    companyName?: true
    jobId?: true
    title?: true
    location?: true
    employmentType?: true
    postedTimestamp?: true
    description?: true
    url?: true
    source?: true
    hash?: true
    firstSeen?: true
    lastSeen?: true
    status?: true
    embedding?: true
    remote?: true
    salary?: true
    department?: true
    skills?: true
    experience?: true
    llmProcessed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    companyId?: true
    companyName?: true
    jobId?: true
    title?: true
    location?: true
    employmentType?: true
    postedTimestamp?: true
    description?: true
    url?: true
    source?: true
    hash?: true
    firstSeen?: true
    lastSeen?: true
    status?: true
    embedding?: true
    remote?: true
    salary?: true
    department?: true
    skills?: true
    experience?: true
    llmProcessed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    companyId?: true
    companyName?: true
    jobId?: true
    title?: true
    location?: true
    employmentType?: true
    postedTimestamp?: true
    description?: true
    url?: true
    source?: true
    hash?: true
    firstSeen?: true
    lastSeen?: true
    status?: true
    embedding?: true
    remote?: true
    salary?: true
    department?: true
    skills?: true
    experience?: true
    llmProcessed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    companyId: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType: string | null
    postedTimestamp: Date | null
    description: string | null
    url: string
    source: string
    hash: string
    firstSeen: Date
    lastSeen: Date
    status: string
    embedding: string | null
    remote: boolean
    salary: string | null
    department: string | null
    skills: string | null
    experience: string | null
    llmProcessed: boolean
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    jobId?: boolean
    title?: boolean
    location?: boolean
    employmentType?: boolean
    postedTimestamp?: boolean
    description?: boolean
    url?: boolean
    source?: boolean
    hash?: boolean
    firstSeen?: boolean
    lastSeen?: boolean
    status?: boolean
    embedding?: boolean
    remote?: boolean
    salary?: boolean
    department?: boolean
    skills?: boolean
    experience?: boolean
    llmProcessed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    jobSkills?: boolean | Job$jobSkillsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    jobId?: boolean
    title?: boolean
    location?: boolean
    employmentType?: boolean
    postedTimestamp?: boolean
    description?: boolean
    url?: boolean
    source?: boolean
    hash?: boolean
    firstSeen?: boolean
    lastSeen?: boolean
    status?: boolean
    embedding?: boolean
    remote?: boolean
    salary?: boolean
    department?: boolean
    skills?: boolean
    experience?: boolean
    llmProcessed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    companyId?: boolean
    companyName?: boolean
    jobId?: boolean
    title?: boolean
    location?: boolean
    employmentType?: boolean
    postedTimestamp?: boolean
    description?: boolean
    url?: boolean
    source?: boolean
    hash?: boolean
    firstSeen?: boolean
    lastSeen?: boolean
    status?: boolean
    embedding?: boolean
    remote?: boolean
    salary?: boolean
    department?: boolean
    skills?: boolean
    experience?: boolean
    llmProcessed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    jobSkills?: boolean | Job$jobSkillsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      jobSkills: Prisma.$JobSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      companyName: string
      jobId: string
      title: string
      location: string
      employmentType: string | null
      postedTimestamp: Date | null
      description: string | null
      url: string
      source: string
      hash: string
      firstSeen: Date
      lastSeen: Date
      status: string
      embedding: string | null
      remote: boolean
      salary: string | null
      department: string | null
      skills: string | null
      experience: string | null
      llmProcessed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jobSkills<T extends Job$jobSkillsArgs<ExtArgs> = {}>(args?: Subset<T, Job$jobSkillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */ 
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly companyId: FieldRef<"Job", 'String'>
    readonly companyName: FieldRef<"Job", 'String'>
    readonly jobId: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly location: FieldRef<"Job", 'String'>
    readonly employmentType: FieldRef<"Job", 'String'>
    readonly postedTimestamp: FieldRef<"Job", 'DateTime'>
    readonly description: FieldRef<"Job", 'String'>
    readonly url: FieldRef<"Job", 'String'>
    readonly source: FieldRef<"Job", 'String'>
    readonly hash: FieldRef<"Job", 'String'>
    readonly firstSeen: FieldRef<"Job", 'DateTime'>
    readonly lastSeen: FieldRef<"Job", 'DateTime'>
    readonly status: FieldRef<"Job", 'String'>
    readonly embedding: FieldRef<"Job", 'String'>
    readonly remote: FieldRef<"Job", 'Boolean'>
    readonly salary: FieldRef<"Job", 'String'>
    readonly department: FieldRef<"Job", 'String'>
    readonly skills: FieldRef<"Job", 'String'>
    readonly experience: FieldRef<"Job", 'String'>
    readonly llmProcessed: FieldRef<"Job", 'Boolean'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
  }

  /**
   * Job.jobSkills
   */
  export type Job$jobSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    where?: JobSkillWhereInput
    orderBy?: JobSkillOrderByWithRelationInput | JobSkillOrderByWithRelationInput[]
    cursor?: JobSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobSkillScalarFieldEnum | JobSkillScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type SkillMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type SkillCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SkillMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SkillMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SkillCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type SkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillWhereInput
    orderBy?: SkillOrderByWithAggregationInput | SkillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: SkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    id: string
    name: string
    _count: SkillCountAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type SkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    jobSkills?: boolean | Skill$jobSkillsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["skill"]>

  export type SkillSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type SkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobSkills?: boolean | Skill$jobSkillsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skill"
    objects: {
      jobSkills: Prisma.$JobSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = $Result.GetResult<Prisma.$SkillPayload, S>

  type SkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface SkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skill'], meta: { name: 'Skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillFindManyArgs>(args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends SkillCreateArgs>(args: SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillCreateManyArgs>(args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Skills and returns the data saved in the database.
     * @param {SkillCreateManyAndReturnArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Skills and only return the `id`
     * const skillWithIdOnly = await prisma.skill.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkillCreateManyAndReturnArgs>(args?: SelectSubset<T, SkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends SkillDeleteArgs>(args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUpdateArgs>(args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillDeleteManyArgs>(args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUpdateManyArgs>(args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs['orderBy'] }
        : { orderBy?: SkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skill model
   */
  readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobSkills<T extends Skill$jobSkillsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$jobSkillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skill model
   */ 
  interface SkillFieldRefs {
    readonly id: FieldRef<"Skill", 'String'>
    readonly name: FieldRef<"Skill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill create
   */
  export type SkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>
  }

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
  }

  /**
   * Skill createManyAndReturn
   */
  export type SkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
  }

  /**
   * Skill update
   */
  export type SkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
  }

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
  }

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput
  }

  /**
   * Skill.jobSkills
   */
  export type Skill$jobSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    where?: JobSkillWhereInput
    orderBy?: JobSkillOrderByWithRelationInput | JobSkillOrderByWithRelationInput[]
    cursor?: JobSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobSkillScalarFieldEnum | JobSkillScalarFieldEnum[]
  }

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
  }


  /**
   * Model JobSkill
   */

  export type AggregateJobSkill = {
    _count: JobSkillCountAggregateOutputType | null
    _min: JobSkillMinAggregateOutputType | null
    _max: JobSkillMaxAggregateOutputType | null
  }

  export type JobSkillMinAggregateOutputType = {
    jobId: string | null
    skillId: string | null
  }

  export type JobSkillMaxAggregateOutputType = {
    jobId: string | null
    skillId: string | null
  }

  export type JobSkillCountAggregateOutputType = {
    jobId: number
    skillId: number
    _all: number
  }


  export type JobSkillMinAggregateInputType = {
    jobId?: true
    skillId?: true
  }

  export type JobSkillMaxAggregateInputType = {
    jobId?: true
    skillId?: true
  }

  export type JobSkillCountAggregateInputType = {
    jobId?: true
    skillId?: true
    _all?: true
  }

  export type JobSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSkill to aggregate.
     */
    where?: JobSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSkills to fetch.
     */
    orderBy?: JobSkillOrderByWithRelationInput | JobSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobSkills
    **/
    _count?: true | JobSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobSkillMaxAggregateInputType
  }

  export type GetJobSkillAggregateType<T extends JobSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateJobSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobSkill[P]>
      : GetScalarType<T[P], AggregateJobSkill[P]>
  }




  export type JobSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSkillWhereInput
    orderBy?: JobSkillOrderByWithAggregationInput | JobSkillOrderByWithAggregationInput[]
    by: JobSkillScalarFieldEnum[] | JobSkillScalarFieldEnum
    having?: JobSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobSkillCountAggregateInputType | true
    _min?: JobSkillMinAggregateInputType
    _max?: JobSkillMaxAggregateInputType
  }

  export type JobSkillGroupByOutputType = {
    jobId: string
    skillId: string
    _count: JobSkillCountAggregateOutputType | null
    _min: JobSkillMinAggregateOutputType | null
    _max: JobSkillMaxAggregateOutputType | null
  }

  type GetJobSkillGroupByPayload<T extends JobSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobSkillGroupByOutputType[P]>
            : GetScalarType<T[P], JobSkillGroupByOutputType[P]>
        }
      >
    >


  export type JobSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    skillId?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSkill"]>

  export type JobSkillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    jobId?: boolean
    skillId?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSkill"]>

  export type JobSkillSelectScalar = {
    jobId?: boolean
    skillId?: boolean
  }

  export type JobSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }
  export type JobSkillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $JobSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobSkill"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      jobId: string
      skillId: string
    }, ExtArgs["result"]["jobSkill"]>
    composites: {}
  }

  type JobSkillGetPayload<S extends boolean | null | undefined | JobSkillDefaultArgs> = $Result.GetResult<Prisma.$JobSkillPayload, S>

  type JobSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobSkillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobSkillCountAggregateInputType | true
    }

  export interface JobSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobSkill'], meta: { name: 'JobSkill' } }
    /**
     * Find zero or one JobSkill that matches the filter.
     * @param {JobSkillFindUniqueArgs} args - Arguments to find a JobSkill
     * @example
     * // Get one JobSkill
     * const jobSkill = await prisma.jobSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobSkillFindUniqueArgs>(args: SelectSubset<T, JobSkillFindUniqueArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JobSkill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobSkillFindUniqueOrThrowArgs} args - Arguments to find a JobSkill
     * @example
     * // Get one JobSkill
     * const jobSkill = await prisma.jobSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, JobSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JobSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillFindFirstArgs} args - Arguments to find a JobSkill
     * @example
     * // Get one JobSkill
     * const jobSkill = await prisma.jobSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobSkillFindFirstArgs>(args?: SelectSubset<T, JobSkillFindFirstArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JobSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillFindFirstOrThrowArgs} args - Arguments to find a JobSkill
     * @example
     * // Get one JobSkill
     * const jobSkill = await prisma.jobSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, JobSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JobSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobSkills
     * const jobSkills = await prisma.jobSkill.findMany()
     * 
     * // Get first 10 JobSkills
     * const jobSkills = await prisma.jobSkill.findMany({ take: 10 })
     * 
     * // Only select the `jobId`
     * const jobSkillWithJobIdOnly = await prisma.jobSkill.findMany({ select: { jobId: true } })
     * 
     */
    findMany<T extends JobSkillFindManyArgs>(args?: SelectSubset<T, JobSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JobSkill.
     * @param {JobSkillCreateArgs} args - Arguments to create a JobSkill.
     * @example
     * // Create one JobSkill
     * const JobSkill = await prisma.jobSkill.create({
     *   data: {
     *     // ... data to create a JobSkill
     *   }
     * })
     * 
     */
    create<T extends JobSkillCreateArgs>(args: SelectSubset<T, JobSkillCreateArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JobSkills.
     * @param {JobSkillCreateManyArgs} args - Arguments to create many JobSkills.
     * @example
     * // Create many JobSkills
     * const jobSkill = await prisma.jobSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobSkillCreateManyArgs>(args?: SelectSubset<T, JobSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobSkills and returns the data saved in the database.
     * @param {JobSkillCreateManyAndReturnArgs} args - Arguments to create many JobSkills.
     * @example
     * // Create many JobSkills
     * const jobSkill = await prisma.jobSkill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobSkills and only return the `jobId`
     * const jobSkillWithJobIdOnly = await prisma.jobSkill.createManyAndReturn({ 
     *   select: { jobId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobSkillCreateManyAndReturnArgs>(args?: SelectSubset<T, JobSkillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JobSkill.
     * @param {JobSkillDeleteArgs} args - Arguments to delete one JobSkill.
     * @example
     * // Delete one JobSkill
     * const JobSkill = await prisma.jobSkill.delete({
     *   where: {
     *     // ... filter to delete one JobSkill
     *   }
     * })
     * 
     */
    delete<T extends JobSkillDeleteArgs>(args: SelectSubset<T, JobSkillDeleteArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JobSkill.
     * @param {JobSkillUpdateArgs} args - Arguments to update one JobSkill.
     * @example
     * // Update one JobSkill
     * const jobSkill = await prisma.jobSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobSkillUpdateArgs>(args: SelectSubset<T, JobSkillUpdateArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JobSkills.
     * @param {JobSkillDeleteManyArgs} args - Arguments to filter JobSkills to delete.
     * @example
     * // Delete a few JobSkills
     * const { count } = await prisma.jobSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobSkillDeleteManyArgs>(args?: SelectSubset<T, JobSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobSkills
     * const jobSkill = await prisma.jobSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobSkillUpdateManyArgs>(args: SelectSubset<T, JobSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobSkill.
     * @param {JobSkillUpsertArgs} args - Arguments to update or create a JobSkill.
     * @example
     * // Update or create a JobSkill
     * const jobSkill = await prisma.jobSkill.upsert({
     *   create: {
     *     // ... data to create a JobSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobSkill we want to update
     *   }
     * })
     */
    upsert<T extends JobSkillUpsertArgs>(args: SelectSubset<T, JobSkillUpsertArgs<ExtArgs>>): Prisma__JobSkillClient<$Result.GetResult<Prisma.$JobSkillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JobSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillCountArgs} args - Arguments to filter JobSkills to count.
     * @example
     * // Count the number of JobSkills
     * const count = await prisma.jobSkill.count({
     *   where: {
     *     // ... the filter for the JobSkills we want to count
     *   }
     * })
    **/
    count<T extends JobSkillCountArgs>(
      args?: Subset<T, JobSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobSkillAggregateArgs>(args: Subset<T, JobSkillAggregateArgs>): Prisma.PrismaPromise<GetJobSkillAggregateType<T>>

    /**
     * Group by JobSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobSkillGroupByArgs['orderBy'] }
        : { orderBy?: JobSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobSkill model
   */
  readonly fields: JobSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobSkill model
   */ 
  interface JobSkillFieldRefs {
    readonly jobId: FieldRef<"JobSkill", 'String'>
    readonly skillId: FieldRef<"JobSkill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JobSkill findUnique
   */
  export type JobSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSkill to fetch.
     */
    where: JobSkillWhereUniqueInput
  }

  /**
   * JobSkill findUniqueOrThrow
   */
  export type JobSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSkill to fetch.
     */
    where: JobSkillWhereUniqueInput
  }

  /**
   * JobSkill findFirst
   */
  export type JobSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSkill to fetch.
     */
    where?: JobSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSkills to fetch.
     */
    orderBy?: JobSkillOrderByWithRelationInput | JobSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSkills.
     */
    cursor?: JobSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSkills.
     */
    distinct?: JobSkillScalarFieldEnum | JobSkillScalarFieldEnum[]
  }

  /**
   * JobSkill findFirstOrThrow
   */
  export type JobSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSkill to fetch.
     */
    where?: JobSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSkills to fetch.
     */
    orderBy?: JobSkillOrderByWithRelationInput | JobSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSkills.
     */
    cursor?: JobSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSkills.
     */
    distinct?: JobSkillScalarFieldEnum | JobSkillScalarFieldEnum[]
  }

  /**
   * JobSkill findMany
   */
  export type JobSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSkills to fetch.
     */
    where?: JobSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSkills to fetch.
     */
    orderBy?: JobSkillOrderByWithRelationInput | JobSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobSkills.
     */
    cursor?: JobSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSkills.
     */
    skip?: number
    distinct?: JobSkillScalarFieldEnum | JobSkillScalarFieldEnum[]
  }

  /**
   * JobSkill create
   */
  export type JobSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a JobSkill.
     */
    data: XOR<JobSkillCreateInput, JobSkillUncheckedCreateInput>
  }

  /**
   * JobSkill createMany
   */
  export type JobSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobSkills.
     */
    data: JobSkillCreateManyInput | JobSkillCreateManyInput[]
  }

  /**
   * JobSkill createManyAndReturn
   */
  export type JobSkillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JobSkills.
     */
    data: JobSkillCreateManyInput | JobSkillCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JobSkill update
   */
  export type JobSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a JobSkill.
     */
    data: XOR<JobSkillUpdateInput, JobSkillUncheckedUpdateInput>
    /**
     * Choose, which JobSkill to update.
     */
    where: JobSkillWhereUniqueInput
  }

  /**
   * JobSkill updateMany
   */
  export type JobSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobSkills.
     */
    data: XOR<JobSkillUpdateManyMutationInput, JobSkillUncheckedUpdateManyInput>
    /**
     * Filter which JobSkills to update
     */
    where?: JobSkillWhereInput
  }

  /**
   * JobSkill upsert
   */
  export type JobSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the JobSkill to update in case it exists.
     */
    where: JobSkillWhereUniqueInput
    /**
     * In case the JobSkill found by the `where` argument doesn't exist, create a new JobSkill with this data.
     */
    create: XOR<JobSkillCreateInput, JobSkillUncheckedCreateInput>
    /**
     * In case the JobSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobSkillUpdateInput, JobSkillUncheckedUpdateInput>
  }

  /**
   * JobSkill delete
   */
  export type JobSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
    /**
     * Filter which JobSkill to delete.
     */
    where: JobSkillWhereUniqueInput
  }

  /**
   * JobSkill deleteMany
   */
  export type JobSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSkills to delete
     */
    where?: JobSkillWhereInput
  }

  /**
   * JobSkill without action
   */
  export type JobSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSkill
     */
    select?: JobSkillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSkillInclude<ExtArgs> | null
  }


  /**
   * Model CrawlLog
   */

  export type AggregateCrawlLog = {
    _count: CrawlLogCountAggregateOutputType | null
    _avg: CrawlLogAvgAggregateOutputType | null
    _sum: CrawlLogSumAggregateOutputType | null
    _min: CrawlLogMinAggregateOutputType | null
    _max: CrawlLogMaxAggregateOutputType | null
  }

  export type CrawlLogAvgAggregateOutputType = {
    jobsFound: number | null
    jobsNew: number | null
    durationMs: number | null
  }

  export type CrawlLogSumAggregateOutputType = {
    jobsFound: number | null
    jobsNew: number | null
    durationMs: number | null
  }

  export type CrawlLogMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    status: string | null
    jobsFound: number | null
    jobsNew: number | null
    errorMessage: string | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type CrawlLogMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    status: string | null
    jobsFound: number | null
    jobsNew: number | null
    errorMessage: string | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type CrawlLogCountAggregateOutputType = {
    id: number
    companyId: number
    status: number
    jobsFound: number
    jobsNew: number
    errorMessage: number
    durationMs: number
    createdAt: number
    _all: number
  }


  export type CrawlLogAvgAggregateInputType = {
    jobsFound?: true
    jobsNew?: true
    durationMs?: true
  }

  export type CrawlLogSumAggregateInputType = {
    jobsFound?: true
    jobsNew?: true
    durationMs?: true
  }

  export type CrawlLogMinAggregateInputType = {
    id?: true
    companyId?: true
    status?: true
    jobsFound?: true
    jobsNew?: true
    errorMessage?: true
    durationMs?: true
    createdAt?: true
  }

  export type CrawlLogMaxAggregateInputType = {
    id?: true
    companyId?: true
    status?: true
    jobsFound?: true
    jobsNew?: true
    errorMessage?: true
    durationMs?: true
    createdAt?: true
  }

  export type CrawlLogCountAggregateInputType = {
    id?: true
    companyId?: true
    status?: true
    jobsFound?: true
    jobsNew?: true
    errorMessage?: true
    durationMs?: true
    createdAt?: true
    _all?: true
  }

  export type CrawlLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlLog to aggregate.
     */
    where?: CrawlLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlLogs to fetch.
     */
    orderBy?: CrawlLogOrderByWithRelationInput | CrawlLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CrawlLogs
    **/
    _count?: true | CrawlLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrawlLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrawlLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlLogMaxAggregateInputType
  }

  export type GetCrawlLogAggregateType<T extends CrawlLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawlLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawlLog[P]>
      : GetScalarType<T[P], AggregateCrawlLog[P]>
  }




  export type CrawlLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlLogWhereInput
    orderBy?: CrawlLogOrderByWithAggregationInput | CrawlLogOrderByWithAggregationInput[]
    by: CrawlLogScalarFieldEnum[] | CrawlLogScalarFieldEnum
    having?: CrawlLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlLogCountAggregateInputType | true
    _avg?: CrawlLogAvgAggregateInputType
    _sum?: CrawlLogSumAggregateInputType
    _min?: CrawlLogMinAggregateInputType
    _max?: CrawlLogMaxAggregateInputType
  }

  export type CrawlLogGroupByOutputType = {
    id: string
    companyId: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage: string | null
    durationMs: number
    createdAt: Date
    _count: CrawlLogCountAggregateOutputType | null
    _avg: CrawlLogAvgAggregateOutputType | null
    _sum: CrawlLogSumAggregateOutputType | null
    _min: CrawlLogMinAggregateOutputType | null
    _max: CrawlLogMaxAggregateOutputType | null
  }

  type GetCrawlLogGroupByPayload<T extends CrawlLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlLogGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlLogGroupByOutputType[P]>
        }
      >
    >


  export type CrawlLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    status?: boolean
    jobsFound?: boolean
    jobsNew?: boolean
    errorMessage?: boolean
    durationMs?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlLog"]>

  export type CrawlLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    status?: boolean
    jobsFound?: boolean
    jobsNew?: boolean
    errorMessage?: boolean
    durationMs?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crawlLog"]>

  export type CrawlLogSelectScalar = {
    id?: boolean
    companyId?: boolean
    status?: boolean
    jobsFound?: boolean
    jobsNew?: boolean
    errorMessage?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }

  export type CrawlLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type CrawlLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $CrawlLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CrawlLog"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      status: string
      jobsFound: number
      jobsNew: number
      errorMessage: string | null
      durationMs: number
      createdAt: Date
    }, ExtArgs["result"]["crawlLog"]>
    composites: {}
  }

  type CrawlLogGetPayload<S extends boolean | null | undefined | CrawlLogDefaultArgs> = $Result.GetResult<Prisma.$CrawlLogPayload, S>

  type CrawlLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CrawlLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CrawlLogCountAggregateInputType | true
    }

  export interface CrawlLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CrawlLog'], meta: { name: 'CrawlLog' } }
    /**
     * Find zero or one CrawlLog that matches the filter.
     * @param {CrawlLogFindUniqueArgs} args - Arguments to find a CrawlLog
     * @example
     * // Get one CrawlLog
     * const crawlLog = await prisma.crawlLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrawlLogFindUniqueArgs>(args: SelectSubset<T, CrawlLogFindUniqueArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CrawlLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CrawlLogFindUniqueOrThrowArgs} args - Arguments to find a CrawlLog
     * @example
     * // Get one CrawlLog
     * const crawlLog = await prisma.crawlLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrawlLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CrawlLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CrawlLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogFindFirstArgs} args - Arguments to find a CrawlLog
     * @example
     * // Get one CrawlLog
     * const crawlLog = await prisma.crawlLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrawlLogFindFirstArgs>(args?: SelectSubset<T, CrawlLogFindFirstArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CrawlLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogFindFirstOrThrowArgs} args - Arguments to find a CrawlLog
     * @example
     * // Get one CrawlLog
     * const crawlLog = await prisma.crawlLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrawlLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CrawlLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CrawlLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CrawlLogs
     * const crawlLogs = await prisma.crawlLog.findMany()
     * 
     * // Get first 10 CrawlLogs
     * const crawlLogs = await prisma.crawlLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crawlLogWithIdOnly = await prisma.crawlLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CrawlLogFindManyArgs>(args?: SelectSubset<T, CrawlLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CrawlLog.
     * @param {CrawlLogCreateArgs} args - Arguments to create a CrawlLog.
     * @example
     * // Create one CrawlLog
     * const CrawlLog = await prisma.crawlLog.create({
     *   data: {
     *     // ... data to create a CrawlLog
     *   }
     * })
     * 
     */
    create<T extends CrawlLogCreateArgs>(args: SelectSubset<T, CrawlLogCreateArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CrawlLogs.
     * @param {CrawlLogCreateManyArgs} args - Arguments to create many CrawlLogs.
     * @example
     * // Create many CrawlLogs
     * const crawlLog = await prisma.crawlLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrawlLogCreateManyArgs>(args?: SelectSubset<T, CrawlLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CrawlLogs and returns the data saved in the database.
     * @param {CrawlLogCreateManyAndReturnArgs} args - Arguments to create many CrawlLogs.
     * @example
     * // Create many CrawlLogs
     * const crawlLog = await prisma.crawlLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CrawlLogs and only return the `id`
     * const crawlLogWithIdOnly = await prisma.crawlLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrawlLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CrawlLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CrawlLog.
     * @param {CrawlLogDeleteArgs} args - Arguments to delete one CrawlLog.
     * @example
     * // Delete one CrawlLog
     * const CrawlLog = await prisma.crawlLog.delete({
     *   where: {
     *     // ... filter to delete one CrawlLog
     *   }
     * })
     * 
     */
    delete<T extends CrawlLogDeleteArgs>(args: SelectSubset<T, CrawlLogDeleteArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CrawlLog.
     * @param {CrawlLogUpdateArgs} args - Arguments to update one CrawlLog.
     * @example
     * // Update one CrawlLog
     * const crawlLog = await prisma.crawlLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrawlLogUpdateArgs>(args: SelectSubset<T, CrawlLogUpdateArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CrawlLogs.
     * @param {CrawlLogDeleteManyArgs} args - Arguments to filter CrawlLogs to delete.
     * @example
     * // Delete a few CrawlLogs
     * const { count } = await prisma.crawlLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrawlLogDeleteManyArgs>(args?: SelectSubset<T, CrawlLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CrawlLogs
     * const crawlLog = await prisma.crawlLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrawlLogUpdateManyArgs>(args: SelectSubset<T, CrawlLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CrawlLog.
     * @param {CrawlLogUpsertArgs} args - Arguments to update or create a CrawlLog.
     * @example
     * // Update or create a CrawlLog
     * const crawlLog = await prisma.crawlLog.upsert({
     *   create: {
     *     // ... data to create a CrawlLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CrawlLog we want to update
     *   }
     * })
     */
    upsert<T extends CrawlLogUpsertArgs>(args: SelectSubset<T, CrawlLogUpsertArgs<ExtArgs>>): Prisma__CrawlLogClient<$Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CrawlLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogCountArgs} args - Arguments to filter CrawlLogs to count.
     * @example
     * // Count the number of CrawlLogs
     * const count = await prisma.crawlLog.count({
     *   where: {
     *     // ... the filter for the CrawlLogs we want to count
     *   }
     * })
    **/
    count<T extends CrawlLogCountArgs>(
      args?: Subset<T, CrawlLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CrawlLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlLogAggregateArgs>(args: Subset<T, CrawlLogAggregateArgs>): Prisma.PrismaPromise<GetCrawlLogAggregateType<T>>

    /**
     * Group by CrawlLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlLogGroupByArgs['orderBy'] }
        : { orderBy?: CrawlLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CrawlLog model
   */
  readonly fields: CrawlLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CrawlLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CrawlLog model
   */ 
  interface CrawlLogFieldRefs {
    readonly id: FieldRef<"CrawlLog", 'String'>
    readonly companyId: FieldRef<"CrawlLog", 'String'>
    readonly status: FieldRef<"CrawlLog", 'String'>
    readonly jobsFound: FieldRef<"CrawlLog", 'Int'>
    readonly jobsNew: FieldRef<"CrawlLog", 'Int'>
    readonly errorMessage: FieldRef<"CrawlLog", 'String'>
    readonly durationMs: FieldRef<"CrawlLog", 'Int'>
    readonly createdAt: FieldRef<"CrawlLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CrawlLog findUnique
   */
  export type CrawlLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * Filter, which CrawlLog to fetch.
     */
    where: CrawlLogWhereUniqueInput
  }

  /**
   * CrawlLog findUniqueOrThrow
   */
  export type CrawlLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * Filter, which CrawlLog to fetch.
     */
    where: CrawlLogWhereUniqueInput
  }

  /**
   * CrawlLog findFirst
   */
  export type CrawlLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * Filter, which CrawlLog to fetch.
     */
    where?: CrawlLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlLogs to fetch.
     */
    orderBy?: CrawlLogOrderByWithRelationInput | CrawlLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlLogs.
     */
    cursor?: CrawlLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlLogs.
     */
    distinct?: CrawlLogScalarFieldEnum | CrawlLogScalarFieldEnum[]
  }

  /**
   * CrawlLog findFirstOrThrow
   */
  export type CrawlLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * Filter, which CrawlLog to fetch.
     */
    where?: CrawlLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlLogs to fetch.
     */
    orderBy?: CrawlLogOrderByWithRelationInput | CrawlLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlLogs.
     */
    cursor?: CrawlLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlLogs.
     */
    distinct?: CrawlLogScalarFieldEnum | CrawlLogScalarFieldEnum[]
  }

  /**
   * CrawlLog findMany
   */
  export type CrawlLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * Filter, which CrawlLogs to fetch.
     */
    where?: CrawlLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlLogs to fetch.
     */
    orderBy?: CrawlLogOrderByWithRelationInput | CrawlLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CrawlLogs.
     */
    cursor?: CrawlLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlLogs.
     */
    skip?: number
    distinct?: CrawlLogScalarFieldEnum | CrawlLogScalarFieldEnum[]
  }

  /**
   * CrawlLog create
   */
  export type CrawlLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CrawlLog.
     */
    data: XOR<CrawlLogCreateInput, CrawlLogUncheckedCreateInput>
  }

  /**
   * CrawlLog createMany
   */
  export type CrawlLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CrawlLogs.
     */
    data: CrawlLogCreateManyInput | CrawlLogCreateManyInput[]
  }

  /**
   * CrawlLog createManyAndReturn
   */
  export type CrawlLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CrawlLogs.
     */
    data: CrawlLogCreateManyInput | CrawlLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrawlLog update
   */
  export type CrawlLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CrawlLog.
     */
    data: XOR<CrawlLogUpdateInput, CrawlLogUncheckedUpdateInput>
    /**
     * Choose, which CrawlLog to update.
     */
    where: CrawlLogWhereUniqueInput
  }

  /**
   * CrawlLog updateMany
   */
  export type CrawlLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CrawlLogs.
     */
    data: XOR<CrawlLogUpdateManyMutationInput, CrawlLogUncheckedUpdateManyInput>
    /**
     * Filter which CrawlLogs to update
     */
    where?: CrawlLogWhereInput
  }

  /**
   * CrawlLog upsert
   */
  export type CrawlLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CrawlLog to update in case it exists.
     */
    where: CrawlLogWhereUniqueInput
    /**
     * In case the CrawlLog found by the `where` argument doesn't exist, create a new CrawlLog with this data.
     */
    create: XOR<CrawlLogCreateInput, CrawlLogUncheckedCreateInput>
    /**
     * In case the CrawlLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlLogUpdateInput, CrawlLogUncheckedUpdateInput>
  }

  /**
   * CrawlLog delete
   */
  export type CrawlLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
    /**
     * Filter which CrawlLog to delete.
     */
    where: CrawlLogWhereUniqueInput
  }

  /**
   * CrawlLog deleteMany
   */
  export type CrawlLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlLogs to delete
     */
    where?: CrawlLogWhereInput
  }

  /**
   * CrawlLog without action
   */
  export type CrawlLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlLog
     */
    select?: CrawlLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlLogInclude<ExtArgs> | null
  }


  /**
   * Model CrawlQueue
   */

  export type AggregateCrawlQueue = {
    _count: CrawlQueueCountAggregateOutputType | null
    _avg: CrawlQueueAvgAggregateOutputType | null
    _sum: CrawlQueueSumAggregateOutputType | null
    _min: CrawlQueueMinAggregateOutputType | null
    _max: CrawlQueueMaxAggregateOutputType | null
  }

  export type CrawlQueueAvgAggregateOutputType = {
    attempts: number | null
  }

  export type CrawlQueueSumAggregateOutputType = {
    attempts: number | null
  }

  export type CrawlQueueMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    status: string | null
    attempts: number | null
    runAfter: Date | null
    createdAt: Date | null
  }

  export type CrawlQueueMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    status: string | null
    attempts: number | null
    runAfter: Date | null
    createdAt: Date | null
  }

  export type CrawlQueueCountAggregateOutputType = {
    id: number
    companyId: number
    status: number
    attempts: number
    runAfter: number
    createdAt: number
    _all: number
  }


  export type CrawlQueueAvgAggregateInputType = {
    attempts?: true
  }

  export type CrawlQueueSumAggregateInputType = {
    attempts?: true
  }

  export type CrawlQueueMinAggregateInputType = {
    id?: true
    companyId?: true
    status?: true
    attempts?: true
    runAfter?: true
    createdAt?: true
  }

  export type CrawlQueueMaxAggregateInputType = {
    id?: true
    companyId?: true
    status?: true
    attempts?: true
    runAfter?: true
    createdAt?: true
  }

  export type CrawlQueueCountAggregateInputType = {
    id?: true
    companyId?: true
    status?: true
    attempts?: true
    runAfter?: true
    createdAt?: true
    _all?: true
  }

  export type CrawlQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlQueue to aggregate.
     */
    where?: CrawlQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlQueues to fetch.
     */
    orderBy?: CrawlQueueOrderByWithRelationInput | CrawlQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CrawlQueues
    **/
    _count?: true | CrawlQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrawlQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrawlQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlQueueMaxAggregateInputType
  }

  export type GetCrawlQueueAggregateType<T extends CrawlQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawlQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawlQueue[P]>
      : GetScalarType<T[P], AggregateCrawlQueue[P]>
  }




  export type CrawlQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlQueueWhereInput
    orderBy?: CrawlQueueOrderByWithAggregationInput | CrawlQueueOrderByWithAggregationInput[]
    by: CrawlQueueScalarFieldEnum[] | CrawlQueueScalarFieldEnum
    having?: CrawlQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlQueueCountAggregateInputType | true
    _avg?: CrawlQueueAvgAggregateInputType
    _sum?: CrawlQueueSumAggregateInputType
    _min?: CrawlQueueMinAggregateInputType
    _max?: CrawlQueueMaxAggregateInputType
  }

  export type CrawlQueueGroupByOutputType = {
    id: string
    companyId: string
    status: string
    attempts: number
    runAfter: Date
    createdAt: Date
    _count: CrawlQueueCountAggregateOutputType | null
    _avg: CrawlQueueAvgAggregateOutputType | null
    _sum: CrawlQueueSumAggregateOutputType | null
    _min: CrawlQueueMinAggregateOutputType | null
    _max: CrawlQueueMaxAggregateOutputType | null
  }

  type GetCrawlQueueGroupByPayload<T extends CrawlQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlQueueGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlQueueGroupByOutputType[P]>
        }
      >
    >


  export type CrawlQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    status?: boolean
    attempts?: boolean
    runAfter?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["crawlQueue"]>

  export type CrawlQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    status?: boolean
    attempts?: boolean
    runAfter?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["crawlQueue"]>

  export type CrawlQueueSelectScalar = {
    id?: boolean
    companyId?: boolean
    status?: boolean
    attempts?: boolean
    runAfter?: boolean
    createdAt?: boolean
  }


  export type $CrawlQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CrawlQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      status: string
      attempts: number
      runAfter: Date
      createdAt: Date
    }, ExtArgs["result"]["crawlQueue"]>
    composites: {}
  }

  type CrawlQueueGetPayload<S extends boolean | null | undefined | CrawlQueueDefaultArgs> = $Result.GetResult<Prisma.$CrawlQueuePayload, S>

  type CrawlQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CrawlQueueFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CrawlQueueCountAggregateInputType | true
    }

  export interface CrawlQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CrawlQueue'], meta: { name: 'CrawlQueue' } }
    /**
     * Find zero or one CrawlQueue that matches the filter.
     * @param {CrawlQueueFindUniqueArgs} args - Arguments to find a CrawlQueue
     * @example
     * // Get one CrawlQueue
     * const crawlQueue = await prisma.crawlQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrawlQueueFindUniqueArgs>(args: SelectSubset<T, CrawlQueueFindUniqueArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CrawlQueue that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CrawlQueueFindUniqueOrThrowArgs} args - Arguments to find a CrawlQueue
     * @example
     * // Get one CrawlQueue
     * const crawlQueue = await prisma.crawlQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrawlQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, CrawlQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CrawlQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueFindFirstArgs} args - Arguments to find a CrawlQueue
     * @example
     * // Get one CrawlQueue
     * const crawlQueue = await prisma.crawlQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrawlQueueFindFirstArgs>(args?: SelectSubset<T, CrawlQueueFindFirstArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CrawlQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueFindFirstOrThrowArgs} args - Arguments to find a CrawlQueue
     * @example
     * // Get one CrawlQueue
     * const crawlQueue = await prisma.crawlQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrawlQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, CrawlQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CrawlQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CrawlQueues
     * const crawlQueues = await prisma.crawlQueue.findMany()
     * 
     * // Get first 10 CrawlQueues
     * const crawlQueues = await prisma.crawlQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crawlQueueWithIdOnly = await prisma.crawlQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CrawlQueueFindManyArgs>(args?: SelectSubset<T, CrawlQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CrawlQueue.
     * @param {CrawlQueueCreateArgs} args - Arguments to create a CrawlQueue.
     * @example
     * // Create one CrawlQueue
     * const CrawlQueue = await prisma.crawlQueue.create({
     *   data: {
     *     // ... data to create a CrawlQueue
     *   }
     * })
     * 
     */
    create<T extends CrawlQueueCreateArgs>(args: SelectSubset<T, CrawlQueueCreateArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CrawlQueues.
     * @param {CrawlQueueCreateManyArgs} args - Arguments to create many CrawlQueues.
     * @example
     * // Create many CrawlQueues
     * const crawlQueue = await prisma.crawlQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrawlQueueCreateManyArgs>(args?: SelectSubset<T, CrawlQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CrawlQueues and returns the data saved in the database.
     * @param {CrawlQueueCreateManyAndReturnArgs} args - Arguments to create many CrawlQueues.
     * @example
     * // Create many CrawlQueues
     * const crawlQueue = await prisma.crawlQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CrawlQueues and only return the `id`
     * const crawlQueueWithIdOnly = await prisma.crawlQueue.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrawlQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, CrawlQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CrawlQueue.
     * @param {CrawlQueueDeleteArgs} args - Arguments to delete one CrawlQueue.
     * @example
     * // Delete one CrawlQueue
     * const CrawlQueue = await prisma.crawlQueue.delete({
     *   where: {
     *     // ... filter to delete one CrawlQueue
     *   }
     * })
     * 
     */
    delete<T extends CrawlQueueDeleteArgs>(args: SelectSubset<T, CrawlQueueDeleteArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CrawlQueue.
     * @param {CrawlQueueUpdateArgs} args - Arguments to update one CrawlQueue.
     * @example
     * // Update one CrawlQueue
     * const crawlQueue = await prisma.crawlQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrawlQueueUpdateArgs>(args: SelectSubset<T, CrawlQueueUpdateArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CrawlQueues.
     * @param {CrawlQueueDeleteManyArgs} args - Arguments to filter CrawlQueues to delete.
     * @example
     * // Delete a few CrawlQueues
     * const { count } = await prisma.crawlQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrawlQueueDeleteManyArgs>(args?: SelectSubset<T, CrawlQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CrawlQueues
     * const crawlQueue = await prisma.crawlQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrawlQueueUpdateManyArgs>(args: SelectSubset<T, CrawlQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CrawlQueue.
     * @param {CrawlQueueUpsertArgs} args - Arguments to update or create a CrawlQueue.
     * @example
     * // Update or create a CrawlQueue
     * const crawlQueue = await prisma.crawlQueue.upsert({
     *   create: {
     *     // ... data to create a CrawlQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CrawlQueue we want to update
     *   }
     * })
     */
    upsert<T extends CrawlQueueUpsertArgs>(args: SelectSubset<T, CrawlQueueUpsertArgs<ExtArgs>>): Prisma__CrawlQueueClient<$Result.GetResult<Prisma.$CrawlQueuePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CrawlQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueCountArgs} args - Arguments to filter CrawlQueues to count.
     * @example
     * // Count the number of CrawlQueues
     * const count = await prisma.crawlQueue.count({
     *   where: {
     *     // ... the filter for the CrawlQueues we want to count
     *   }
     * })
    **/
    count<T extends CrawlQueueCountArgs>(
      args?: Subset<T, CrawlQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CrawlQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlQueueAggregateArgs>(args: Subset<T, CrawlQueueAggregateArgs>): Prisma.PrismaPromise<GetCrawlQueueAggregateType<T>>

    /**
     * Group by CrawlQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlQueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlQueueGroupByArgs['orderBy'] }
        : { orderBy?: CrawlQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CrawlQueue model
   */
  readonly fields: CrawlQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CrawlQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CrawlQueue model
   */ 
  interface CrawlQueueFieldRefs {
    readonly id: FieldRef<"CrawlQueue", 'String'>
    readonly companyId: FieldRef<"CrawlQueue", 'String'>
    readonly status: FieldRef<"CrawlQueue", 'String'>
    readonly attempts: FieldRef<"CrawlQueue", 'Int'>
    readonly runAfter: FieldRef<"CrawlQueue", 'DateTime'>
    readonly createdAt: FieldRef<"CrawlQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CrawlQueue findUnique
   */
  export type CrawlQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * Filter, which CrawlQueue to fetch.
     */
    where: CrawlQueueWhereUniqueInput
  }

  /**
   * CrawlQueue findUniqueOrThrow
   */
  export type CrawlQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * Filter, which CrawlQueue to fetch.
     */
    where: CrawlQueueWhereUniqueInput
  }

  /**
   * CrawlQueue findFirst
   */
  export type CrawlQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * Filter, which CrawlQueue to fetch.
     */
    where?: CrawlQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlQueues to fetch.
     */
    orderBy?: CrawlQueueOrderByWithRelationInput | CrawlQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlQueues.
     */
    cursor?: CrawlQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlQueues.
     */
    distinct?: CrawlQueueScalarFieldEnum | CrawlQueueScalarFieldEnum[]
  }

  /**
   * CrawlQueue findFirstOrThrow
   */
  export type CrawlQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * Filter, which CrawlQueue to fetch.
     */
    where?: CrawlQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlQueues to fetch.
     */
    orderBy?: CrawlQueueOrderByWithRelationInput | CrawlQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlQueues.
     */
    cursor?: CrawlQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlQueues.
     */
    distinct?: CrawlQueueScalarFieldEnum | CrawlQueueScalarFieldEnum[]
  }

  /**
   * CrawlQueue findMany
   */
  export type CrawlQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * Filter, which CrawlQueues to fetch.
     */
    where?: CrawlQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlQueues to fetch.
     */
    orderBy?: CrawlQueueOrderByWithRelationInput | CrawlQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CrawlQueues.
     */
    cursor?: CrawlQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlQueues.
     */
    skip?: number
    distinct?: CrawlQueueScalarFieldEnum | CrawlQueueScalarFieldEnum[]
  }

  /**
   * CrawlQueue create
   */
  export type CrawlQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * The data needed to create a CrawlQueue.
     */
    data: XOR<CrawlQueueCreateInput, CrawlQueueUncheckedCreateInput>
  }

  /**
   * CrawlQueue createMany
   */
  export type CrawlQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CrawlQueues.
     */
    data: CrawlQueueCreateManyInput | CrawlQueueCreateManyInput[]
  }

  /**
   * CrawlQueue createManyAndReturn
   */
  export type CrawlQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CrawlQueues.
     */
    data: CrawlQueueCreateManyInput | CrawlQueueCreateManyInput[]
  }

  /**
   * CrawlQueue update
   */
  export type CrawlQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * The data needed to update a CrawlQueue.
     */
    data: XOR<CrawlQueueUpdateInput, CrawlQueueUncheckedUpdateInput>
    /**
     * Choose, which CrawlQueue to update.
     */
    where: CrawlQueueWhereUniqueInput
  }

  /**
   * CrawlQueue updateMany
   */
  export type CrawlQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CrawlQueues.
     */
    data: XOR<CrawlQueueUpdateManyMutationInput, CrawlQueueUncheckedUpdateManyInput>
    /**
     * Filter which CrawlQueues to update
     */
    where?: CrawlQueueWhereInput
  }

  /**
   * CrawlQueue upsert
   */
  export type CrawlQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * The filter to search for the CrawlQueue to update in case it exists.
     */
    where: CrawlQueueWhereUniqueInput
    /**
     * In case the CrawlQueue found by the `where` argument doesn't exist, create a new CrawlQueue with this data.
     */
    create: XOR<CrawlQueueCreateInput, CrawlQueueUncheckedCreateInput>
    /**
     * In case the CrawlQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlQueueUpdateInput, CrawlQueueUncheckedUpdateInput>
  }

  /**
   * CrawlQueue delete
   */
  export type CrawlQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
    /**
     * Filter which CrawlQueue to delete.
     */
    where: CrawlQueueWhereUniqueInput
  }

  /**
   * CrawlQueue deleteMany
   */
  export type CrawlQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlQueues to delete
     */
    where?: CrawlQueueWhereInput
  }

  /**
   * CrawlQueue without action
   */
  export type CrawlQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlQueue
     */
    select?: CrawlQueueSelect<ExtArgs> | null
  }


  /**
   * Model CompanySource
   */

  export type AggregateCompanySource = {
    _count: CompanySourceCountAggregateOutputType | null
    _min: CompanySourceMinAggregateOutputType | null
    _max: CompanySourceMaxAggregateOutputType | null
  }

  export type CompanySourceMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    sourceName: string | null
  }

  export type CompanySourceMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    sourceName: string | null
  }

  export type CompanySourceCountAggregateOutputType = {
    id: number
    companyId: number
    sourceName: number
    _all: number
  }


  export type CompanySourceMinAggregateInputType = {
    id?: true
    companyId?: true
    sourceName?: true
  }

  export type CompanySourceMaxAggregateInputType = {
    id?: true
    companyId?: true
    sourceName?: true
  }

  export type CompanySourceCountAggregateInputType = {
    id?: true
    companyId?: true
    sourceName?: true
    _all?: true
  }

  export type CompanySourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanySource to aggregate.
     */
    where?: CompanySourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySources to fetch.
     */
    orderBy?: CompanySourceOrderByWithRelationInput | CompanySourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanySourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanySources
    **/
    _count?: true | CompanySourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanySourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanySourceMaxAggregateInputType
  }

  export type GetCompanySourceAggregateType<T extends CompanySourceAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanySource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanySource[P]>
      : GetScalarType<T[P], AggregateCompanySource[P]>
  }




  export type CompanySourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanySourceWhereInput
    orderBy?: CompanySourceOrderByWithAggregationInput | CompanySourceOrderByWithAggregationInput[]
    by: CompanySourceScalarFieldEnum[] | CompanySourceScalarFieldEnum
    having?: CompanySourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanySourceCountAggregateInputType | true
    _min?: CompanySourceMinAggregateInputType
    _max?: CompanySourceMaxAggregateInputType
  }

  export type CompanySourceGroupByOutputType = {
    id: string
    companyId: string
    sourceName: string
    _count: CompanySourceCountAggregateOutputType | null
    _min: CompanySourceMinAggregateOutputType | null
    _max: CompanySourceMaxAggregateOutputType | null
  }

  type GetCompanySourceGroupByPayload<T extends CompanySourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanySourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanySourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanySourceGroupByOutputType[P]>
            : GetScalarType<T[P], CompanySourceGroupByOutputType[P]>
        }
      >
    >


  export type CompanySourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    sourceName?: boolean
  }, ExtArgs["result"]["companySource"]>

  export type CompanySourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    sourceName?: boolean
  }, ExtArgs["result"]["companySource"]>

  export type CompanySourceSelectScalar = {
    id?: boolean
    companyId?: boolean
    sourceName?: boolean
  }


  export type $CompanySourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanySource"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      sourceName: string
    }, ExtArgs["result"]["companySource"]>
    composites: {}
  }

  type CompanySourceGetPayload<S extends boolean | null | undefined | CompanySourceDefaultArgs> = $Result.GetResult<Prisma.$CompanySourcePayload, S>

  type CompanySourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanySourceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanySourceCountAggregateInputType | true
    }

  export interface CompanySourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanySource'], meta: { name: 'CompanySource' } }
    /**
     * Find zero or one CompanySource that matches the filter.
     * @param {CompanySourceFindUniqueArgs} args - Arguments to find a CompanySource
     * @example
     * // Get one CompanySource
     * const companySource = await prisma.companySource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanySourceFindUniqueArgs>(args: SelectSubset<T, CompanySourceFindUniqueArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CompanySource that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanySourceFindUniqueOrThrowArgs} args - Arguments to find a CompanySource
     * @example
     * // Get one CompanySource
     * const companySource = await prisma.companySource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanySourceFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanySourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CompanySource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceFindFirstArgs} args - Arguments to find a CompanySource
     * @example
     * // Get one CompanySource
     * const companySource = await prisma.companySource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanySourceFindFirstArgs>(args?: SelectSubset<T, CompanySourceFindFirstArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CompanySource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceFindFirstOrThrowArgs} args - Arguments to find a CompanySource
     * @example
     * // Get one CompanySource
     * const companySource = await prisma.companySource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanySourceFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanySourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CompanySources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanySources
     * const companySources = await prisma.companySource.findMany()
     * 
     * // Get first 10 CompanySources
     * const companySources = await prisma.companySource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companySourceWithIdOnly = await prisma.companySource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanySourceFindManyArgs>(args?: SelectSubset<T, CompanySourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CompanySource.
     * @param {CompanySourceCreateArgs} args - Arguments to create a CompanySource.
     * @example
     * // Create one CompanySource
     * const CompanySource = await prisma.companySource.create({
     *   data: {
     *     // ... data to create a CompanySource
     *   }
     * })
     * 
     */
    create<T extends CompanySourceCreateArgs>(args: SelectSubset<T, CompanySourceCreateArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CompanySources.
     * @param {CompanySourceCreateManyArgs} args - Arguments to create many CompanySources.
     * @example
     * // Create many CompanySources
     * const companySource = await prisma.companySource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanySourceCreateManyArgs>(args?: SelectSubset<T, CompanySourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanySources and returns the data saved in the database.
     * @param {CompanySourceCreateManyAndReturnArgs} args - Arguments to create many CompanySources.
     * @example
     * // Create many CompanySources
     * const companySource = await prisma.companySource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanySources and only return the `id`
     * const companySourceWithIdOnly = await prisma.companySource.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanySourceCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanySourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CompanySource.
     * @param {CompanySourceDeleteArgs} args - Arguments to delete one CompanySource.
     * @example
     * // Delete one CompanySource
     * const CompanySource = await prisma.companySource.delete({
     *   where: {
     *     // ... filter to delete one CompanySource
     *   }
     * })
     * 
     */
    delete<T extends CompanySourceDeleteArgs>(args: SelectSubset<T, CompanySourceDeleteArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CompanySource.
     * @param {CompanySourceUpdateArgs} args - Arguments to update one CompanySource.
     * @example
     * // Update one CompanySource
     * const companySource = await prisma.companySource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanySourceUpdateArgs>(args: SelectSubset<T, CompanySourceUpdateArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CompanySources.
     * @param {CompanySourceDeleteManyArgs} args - Arguments to filter CompanySources to delete.
     * @example
     * // Delete a few CompanySources
     * const { count } = await prisma.companySource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanySourceDeleteManyArgs>(args?: SelectSubset<T, CompanySourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanySources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanySources
     * const companySource = await prisma.companySource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanySourceUpdateManyArgs>(args: SelectSubset<T, CompanySourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanySource.
     * @param {CompanySourceUpsertArgs} args - Arguments to update or create a CompanySource.
     * @example
     * // Update or create a CompanySource
     * const companySource = await prisma.companySource.upsert({
     *   create: {
     *     // ... data to create a CompanySource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanySource we want to update
     *   }
     * })
     */
    upsert<T extends CompanySourceUpsertArgs>(args: SelectSubset<T, CompanySourceUpsertArgs<ExtArgs>>): Prisma__CompanySourceClient<$Result.GetResult<Prisma.$CompanySourcePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CompanySources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceCountArgs} args - Arguments to filter CompanySources to count.
     * @example
     * // Count the number of CompanySources
     * const count = await prisma.companySource.count({
     *   where: {
     *     // ... the filter for the CompanySources we want to count
     *   }
     * })
    **/
    count<T extends CompanySourceCountArgs>(
      args?: Subset<T, CompanySourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanySourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanySource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanySourceAggregateArgs>(args: Subset<T, CompanySourceAggregateArgs>): Prisma.PrismaPromise<GetCompanySourceAggregateType<T>>

    /**
     * Group by CompanySource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanySourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanySourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanySourceGroupByArgs['orderBy'] }
        : { orderBy?: CompanySourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanySourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanySourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanySource model
   */
  readonly fields: CompanySourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanySource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanySourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanySource model
   */ 
  interface CompanySourceFieldRefs {
    readonly id: FieldRef<"CompanySource", 'String'>
    readonly companyId: FieldRef<"CompanySource", 'String'>
    readonly sourceName: FieldRef<"CompanySource", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompanySource findUnique
   */
  export type CompanySourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * Filter, which CompanySource to fetch.
     */
    where: CompanySourceWhereUniqueInput
  }

  /**
   * CompanySource findUniqueOrThrow
   */
  export type CompanySourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * Filter, which CompanySource to fetch.
     */
    where: CompanySourceWhereUniqueInput
  }

  /**
   * CompanySource findFirst
   */
  export type CompanySourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * Filter, which CompanySource to fetch.
     */
    where?: CompanySourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySources to fetch.
     */
    orderBy?: CompanySourceOrderByWithRelationInput | CompanySourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanySources.
     */
    cursor?: CompanySourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanySources.
     */
    distinct?: CompanySourceScalarFieldEnum | CompanySourceScalarFieldEnum[]
  }

  /**
   * CompanySource findFirstOrThrow
   */
  export type CompanySourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * Filter, which CompanySource to fetch.
     */
    where?: CompanySourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySources to fetch.
     */
    orderBy?: CompanySourceOrderByWithRelationInput | CompanySourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanySources.
     */
    cursor?: CompanySourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanySources.
     */
    distinct?: CompanySourceScalarFieldEnum | CompanySourceScalarFieldEnum[]
  }

  /**
   * CompanySource findMany
   */
  export type CompanySourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * Filter, which CompanySources to fetch.
     */
    where?: CompanySourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanySources to fetch.
     */
    orderBy?: CompanySourceOrderByWithRelationInput | CompanySourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanySources.
     */
    cursor?: CompanySourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanySources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanySources.
     */
    skip?: number
    distinct?: CompanySourceScalarFieldEnum | CompanySourceScalarFieldEnum[]
  }

  /**
   * CompanySource create
   */
  export type CompanySourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * The data needed to create a CompanySource.
     */
    data: XOR<CompanySourceCreateInput, CompanySourceUncheckedCreateInput>
  }

  /**
   * CompanySource createMany
   */
  export type CompanySourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanySources.
     */
    data: CompanySourceCreateManyInput | CompanySourceCreateManyInput[]
  }

  /**
   * CompanySource createManyAndReturn
   */
  export type CompanySourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompanySources.
     */
    data: CompanySourceCreateManyInput | CompanySourceCreateManyInput[]
  }

  /**
   * CompanySource update
   */
  export type CompanySourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * The data needed to update a CompanySource.
     */
    data: XOR<CompanySourceUpdateInput, CompanySourceUncheckedUpdateInput>
    /**
     * Choose, which CompanySource to update.
     */
    where: CompanySourceWhereUniqueInput
  }

  /**
   * CompanySource updateMany
   */
  export type CompanySourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanySources.
     */
    data: XOR<CompanySourceUpdateManyMutationInput, CompanySourceUncheckedUpdateManyInput>
    /**
     * Filter which CompanySources to update
     */
    where?: CompanySourceWhereInput
  }

  /**
   * CompanySource upsert
   */
  export type CompanySourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * The filter to search for the CompanySource to update in case it exists.
     */
    where: CompanySourceWhereUniqueInput
    /**
     * In case the CompanySource found by the `where` argument doesn't exist, create a new CompanySource with this data.
     */
    create: XOR<CompanySourceCreateInput, CompanySourceUncheckedCreateInput>
    /**
     * In case the CompanySource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanySourceUpdateInput, CompanySourceUncheckedUpdateInput>
  }

  /**
   * CompanySource delete
   */
  export type CompanySourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
    /**
     * Filter which CompanySource to delete.
     */
    where: CompanySourceWhereUniqueInput
  }

  /**
   * CompanySource deleteMany
   */
  export type CompanySourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanySources to delete
     */
    where?: CompanySourceWhereInput
  }

  /**
   * CompanySource without action
   */
  export type CompanySourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanySource
     */
    select?: CompanySourceSelect<ExtArgs> | null
  }


  /**
   * Model CompanyAlias
   */

  export type AggregateCompanyAlias = {
    _count: CompanyAliasCountAggregateOutputType | null
    _min: CompanyAliasMinAggregateOutputType | null
    _max: CompanyAliasMaxAggregateOutputType | null
  }

  export type CompanyAliasMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    aliasName: string | null
  }

  export type CompanyAliasMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    aliasName: string | null
  }

  export type CompanyAliasCountAggregateOutputType = {
    id: number
    companyId: number
    aliasName: number
    _all: number
  }


  export type CompanyAliasMinAggregateInputType = {
    id?: true
    companyId?: true
    aliasName?: true
  }

  export type CompanyAliasMaxAggregateInputType = {
    id?: true
    companyId?: true
    aliasName?: true
  }

  export type CompanyAliasCountAggregateInputType = {
    id?: true
    companyId?: true
    aliasName?: true
    _all?: true
  }

  export type CompanyAliasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyAlias to aggregate.
     */
    where?: CompanyAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAliases to fetch.
     */
    orderBy?: CompanyAliasOrderByWithRelationInput | CompanyAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAliases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyAliases
    **/
    _count?: true | CompanyAliasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyAliasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyAliasMaxAggregateInputType
  }

  export type GetCompanyAliasAggregateType<T extends CompanyAliasAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyAlias]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyAlias[P]>
      : GetScalarType<T[P], AggregateCompanyAlias[P]>
  }




  export type CompanyAliasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyAliasWhereInput
    orderBy?: CompanyAliasOrderByWithAggregationInput | CompanyAliasOrderByWithAggregationInput[]
    by: CompanyAliasScalarFieldEnum[] | CompanyAliasScalarFieldEnum
    having?: CompanyAliasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyAliasCountAggregateInputType | true
    _min?: CompanyAliasMinAggregateInputType
    _max?: CompanyAliasMaxAggregateInputType
  }

  export type CompanyAliasGroupByOutputType = {
    id: string
    companyId: string
    aliasName: string
    _count: CompanyAliasCountAggregateOutputType | null
    _min: CompanyAliasMinAggregateOutputType | null
    _max: CompanyAliasMaxAggregateOutputType | null
  }

  type GetCompanyAliasGroupByPayload<T extends CompanyAliasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyAliasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyAliasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyAliasGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyAliasGroupByOutputType[P]>
        }
      >
    >


  export type CompanyAliasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    aliasName?: boolean
  }, ExtArgs["result"]["companyAlias"]>

  export type CompanyAliasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    aliasName?: boolean
  }, ExtArgs["result"]["companyAlias"]>

  export type CompanyAliasSelectScalar = {
    id?: boolean
    companyId?: boolean
    aliasName?: boolean
  }


  export type $CompanyAliasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyAlias"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      aliasName: string
    }, ExtArgs["result"]["companyAlias"]>
    composites: {}
  }

  type CompanyAliasGetPayload<S extends boolean | null | undefined | CompanyAliasDefaultArgs> = $Result.GetResult<Prisma.$CompanyAliasPayload, S>

  type CompanyAliasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CompanyAliasFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CompanyAliasCountAggregateInputType | true
    }

  export interface CompanyAliasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyAlias'], meta: { name: 'CompanyAlias' } }
    /**
     * Find zero or one CompanyAlias that matches the filter.
     * @param {CompanyAliasFindUniqueArgs} args - Arguments to find a CompanyAlias
     * @example
     * // Get one CompanyAlias
     * const companyAlias = await prisma.companyAlias.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyAliasFindUniqueArgs>(args: SelectSubset<T, CompanyAliasFindUniqueArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CompanyAlias that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CompanyAliasFindUniqueOrThrowArgs} args - Arguments to find a CompanyAlias
     * @example
     * // Get one CompanyAlias
     * const companyAlias = await prisma.companyAlias.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyAliasFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyAliasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CompanyAlias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasFindFirstArgs} args - Arguments to find a CompanyAlias
     * @example
     * // Get one CompanyAlias
     * const companyAlias = await prisma.companyAlias.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyAliasFindFirstArgs>(args?: SelectSubset<T, CompanyAliasFindFirstArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CompanyAlias that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasFindFirstOrThrowArgs} args - Arguments to find a CompanyAlias
     * @example
     * // Get one CompanyAlias
     * const companyAlias = await prisma.companyAlias.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyAliasFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyAliasFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CompanyAliases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyAliases
     * const companyAliases = await prisma.companyAlias.findMany()
     * 
     * // Get first 10 CompanyAliases
     * const companyAliases = await prisma.companyAlias.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyAliasWithIdOnly = await prisma.companyAlias.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyAliasFindManyArgs>(args?: SelectSubset<T, CompanyAliasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CompanyAlias.
     * @param {CompanyAliasCreateArgs} args - Arguments to create a CompanyAlias.
     * @example
     * // Create one CompanyAlias
     * const CompanyAlias = await prisma.companyAlias.create({
     *   data: {
     *     // ... data to create a CompanyAlias
     *   }
     * })
     * 
     */
    create<T extends CompanyAliasCreateArgs>(args: SelectSubset<T, CompanyAliasCreateArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CompanyAliases.
     * @param {CompanyAliasCreateManyArgs} args - Arguments to create many CompanyAliases.
     * @example
     * // Create many CompanyAliases
     * const companyAlias = await prisma.companyAlias.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyAliasCreateManyArgs>(args?: SelectSubset<T, CompanyAliasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyAliases and returns the data saved in the database.
     * @param {CompanyAliasCreateManyAndReturnArgs} args - Arguments to create many CompanyAliases.
     * @example
     * // Create many CompanyAliases
     * const companyAlias = await prisma.companyAlias.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyAliases and only return the `id`
     * const companyAliasWithIdOnly = await prisma.companyAlias.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyAliasCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyAliasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CompanyAlias.
     * @param {CompanyAliasDeleteArgs} args - Arguments to delete one CompanyAlias.
     * @example
     * // Delete one CompanyAlias
     * const CompanyAlias = await prisma.companyAlias.delete({
     *   where: {
     *     // ... filter to delete one CompanyAlias
     *   }
     * })
     * 
     */
    delete<T extends CompanyAliasDeleteArgs>(args: SelectSubset<T, CompanyAliasDeleteArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CompanyAlias.
     * @param {CompanyAliasUpdateArgs} args - Arguments to update one CompanyAlias.
     * @example
     * // Update one CompanyAlias
     * const companyAlias = await prisma.companyAlias.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyAliasUpdateArgs>(args: SelectSubset<T, CompanyAliasUpdateArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CompanyAliases.
     * @param {CompanyAliasDeleteManyArgs} args - Arguments to filter CompanyAliases to delete.
     * @example
     * // Delete a few CompanyAliases
     * const { count } = await prisma.companyAlias.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyAliasDeleteManyArgs>(args?: SelectSubset<T, CompanyAliasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyAliases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyAliases
     * const companyAlias = await prisma.companyAlias.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyAliasUpdateManyArgs>(args: SelectSubset<T, CompanyAliasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyAlias.
     * @param {CompanyAliasUpsertArgs} args - Arguments to update or create a CompanyAlias.
     * @example
     * // Update or create a CompanyAlias
     * const companyAlias = await prisma.companyAlias.upsert({
     *   create: {
     *     // ... data to create a CompanyAlias
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyAlias we want to update
     *   }
     * })
     */
    upsert<T extends CompanyAliasUpsertArgs>(args: SelectSubset<T, CompanyAliasUpsertArgs<ExtArgs>>): Prisma__CompanyAliasClient<$Result.GetResult<Prisma.$CompanyAliasPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CompanyAliases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasCountArgs} args - Arguments to filter CompanyAliases to count.
     * @example
     * // Count the number of CompanyAliases
     * const count = await prisma.companyAlias.count({
     *   where: {
     *     // ... the filter for the CompanyAliases we want to count
     *   }
     * })
    **/
    count<T extends CompanyAliasCountArgs>(
      args?: Subset<T, CompanyAliasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyAliasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyAlias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAliasAggregateArgs>(args: Subset<T, CompanyAliasAggregateArgs>): Prisma.PrismaPromise<GetCompanyAliasAggregateType<T>>

    /**
     * Group by CompanyAlias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAliasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyAliasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyAliasGroupByArgs['orderBy'] }
        : { orderBy?: CompanyAliasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyAliasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyAliasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyAlias model
   */
  readonly fields: CompanyAliasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyAlias.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyAliasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyAlias model
   */ 
  interface CompanyAliasFieldRefs {
    readonly id: FieldRef<"CompanyAlias", 'String'>
    readonly companyId: FieldRef<"CompanyAlias", 'String'>
    readonly aliasName: FieldRef<"CompanyAlias", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompanyAlias findUnique
   */
  export type CompanyAliasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * Filter, which CompanyAlias to fetch.
     */
    where: CompanyAliasWhereUniqueInput
  }

  /**
   * CompanyAlias findUniqueOrThrow
   */
  export type CompanyAliasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * Filter, which CompanyAlias to fetch.
     */
    where: CompanyAliasWhereUniqueInput
  }

  /**
   * CompanyAlias findFirst
   */
  export type CompanyAliasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * Filter, which CompanyAlias to fetch.
     */
    where?: CompanyAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAliases to fetch.
     */
    orderBy?: CompanyAliasOrderByWithRelationInput | CompanyAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyAliases.
     */
    cursor?: CompanyAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAliases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyAliases.
     */
    distinct?: CompanyAliasScalarFieldEnum | CompanyAliasScalarFieldEnum[]
  }

  /**
   * CompanyAlias findFirstOrThrow
   */
  export type CompanyAliasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * Filter, which CompanyAlias to fetch.
     */
    where?: CompanyAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAliases to fetch.
     */
    orderBy?: CompanyAliasOrderByWithRelationInput | CompanyAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyAliases.
     */
    cursor?: CompanyAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAliases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyAliases.
     */
    distinct?: CompanyAliasScalarFieldEnum | CompanyAliasScalarFieldEnum[]
  }

  /**
   * CompanyAlias findMany
   */
  export type CompanyAliasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * Filter, which CompanyAliases to fetch.
     */
    where?: CompanyAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyAliases to fetch.
     */
    orderBy?: CompanyAliasOrderByWithRelationInput | CompanyAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyAliases.
     */
    cursor?: CompanyAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyAliases.
     */
    skip?: number
    distinct?: CompanyAliasScalarFieldEnum | CompanyAliasScalarFieldEnum[]
  }

  /**
   * CompanyAlias create
   */
  export type CompanyAliasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * The data needed to create a CompanyAlias.
     */
    data: XOR<CompanyAliasCreateInput, CompanyAliasUncheckedCreateInput>
  }

  /**
   * CompanyAlias createMany
   */
  export type CompanyAliasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyAliases.
     */
    data: CompanyAliasCreateManyInput | CompanyAliasCreateManyInput[]
  }

  /**
   * CompanyAlias createManyAndReturn
   */
  export type CompanyAliasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CompanyAliases.
     */
    data: CompanyAliasCreateManyInput | CompanyAliasCreateManyInput[]
  }

  /**
   * CompanyAlias update
   */
  export type CompanyAliasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * The data needed to update a CompanyAlias.
     */
    data: XOR<CompanyAliasUpdateInput, CompanyAliasUncheckedUpdateInput>
    /**
     * Choose, which CompanyAlias to update.
     */
    where: CompanyAliasWhereUniqueInput
  }

  /**
   * CompanyAlias updateMany
   */
  export type CompanyAliasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyAliases.
     */
    data: XOR<CompanyAliasUpdateManyMutationInput, CompanyAliasUncheckedUpdateManyInput>
    /**
     * Filter which CompanyAliases to update
     */
    where?: CompanyAliasWhereInput
  }

  /**
   * CompanyAlias upsert
   */
  export type CompanyAliasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * The filter to search for the CompanyAlias to update in case it exists.
     */
    where: CompanyAliasWhereUniqueInput
    /**
     * In case the CompanyAlias found by the `where` argument doesn't exist, create a new CompanyAlias with this data.
     */
    create: XOR<CompanyAliasCreateInput, CompanyAliasUncheckedCreateInput>
    /**
     * In case the CompanyAlias was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyAliasUpdateInput, CompanyAliasUncheckedUpdateInput>
  }

  /**
   * CompanyAlias delete
   */
  export type CompanyAliasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
    /**
     * Filter which CompanyAlias to delete.
     */
    where: CompanyAliasWhereUniqueInput
  }

  /**
   * CompanyAlias deleteMany
   */
  export type CompanyAliasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyAliases to delete
     */
    where?: CompanyAliasWhereInput
  }

  /**
   * CompanyAlias without action
   */
  export type CompanyAliasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyAlias
     */
    select?: CompanyAliasSelect<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsMinAggregateOutputType = {
    id: string | null
    dataJson: string | null
    updatedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: string | null
    dataJson: string | null
    updatedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    dataJson: number
    updatedAt: number
    _all: number
  }


  export type SettingsMinAggregateInputType = {
    id?: true
    dataJson?: true
    updatedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    dataJson?: true
    updatedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    dataJson?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: string
    dataJson: string
    updatedAt: Date
    _count: SettingsCountAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataJson?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataJson?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectScalar = {
    id?: boolean
    dataJson?: boolean
    updatedAt?: boolean
  }


  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dataJson: string
      updatedAt: Date
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingsCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */ 
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'String'>
    readonly dataJson: FieldRef<"Settings", 'String'>
    readonly updatedAt: FieldRef<"Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings createManyAndReturn
   */
  export type SettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    careerPageUrl: 'careerPageUrl',
    sourceType: 'sourceType',
    atsProvider: 'atsProvider',
    crawlFrequency: 'crawlFrequency',
    lastSuccessfulCrawl: 'lastSuccessfulCrawl',
    apiEndpoint: 'apiEndpoint',
    sourceFingerprint: 'sourceFingerprint',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    website: 'website',
    industry: 'industry',
    country: 'country',
    github: 'github',
    linkedin: 'linkedin',
    crunchbase: 'crunchbase',
    lastChecked: 'lastChecked',
    status: 'status',
    priorityScore: 'priorityScore'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const CareerPageScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    careerUrl: 'careerUrl',
    confidence: 'confidence',
    foundBy: 'foundBy',
    date: 'date'
  };

  export type CareerPageScalarFieldEnum = (typeof CareerPageScalarFieldEnum)[keyof typeof CareerPageScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    companyName: 'companyName',
    jobId: 'jobId',
    title: 'title',
    location: 'location',
    employmentType: 'employmentType',
    postedTimestamp: 'postedTimestamp',
    description: 'description',
    url: 'url',
    source: 'source',
    hash: 'hash',
    firstSeen: 'firstSeen',
    lastSeen: 'lastSeen',
    status: 'status',
    embedding: 'embedding',
    remote: 'remote',
    salary: 'salary',
    department: 'department',
    skills: 'skills',
    experience: 'experience',
    llmProcessed: 'llmProcessed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const JobSkillScalarFieldEnum: {
    jobId: 'jobId',
    skillId: 'skillId'
  };

  export type JobSkillScalarFieldEnum = (typeof JobSkillScalarFieldEnum)[keyof typeof JobSkillScalarFieldEnum]


  export const CrawlLogScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    status: 'status',
    jobsFound: 'jobsFound',
    jobsNew: 'jobsNew',
    errorMessage: 'errorMessage',
    durationMs: 'durationMs',
    createdAt: 'createdAt'
  };

  export type CrawlLogScalarFieldEnum = (typeof CrawlLogScalarFieldEnum)[keyof typeof CrawlLogScalarFieldEnum]


  export const CrawlQueueScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    status: 'status',
    attempts: 'attempts',
    runAfter: 'runAfter',
    createdAt: 'createdAt'
  };

  export type CrawlQueueScalarFieldEnum = (typeof CrawlQueueScalarFieldEnum)[keyof typeof CrawlQueueScalarFieldEnum]


  export const CompanySourceScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    sourceName: 'sourceName'
  };

  export type CompanySourceScalarFieldEnum = (typeof CompanySourceScalarFieldEnum)[keyof typeof CompanySourceScalarFieldEnum]


  export const CompanyAliasScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    aliasName: 'aliasName'
  };

  export type CompanyAliasScalarFieldEnum = (typeof CompanyAliasScalarFieldEnum)[keyof typeof CompanyAliasScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    dataJson: 'dataJson',
    updatedAt: 'updatedAt'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    careerPageUrl?: StringFilter<"Company"> | string
    sourceType?: StringFilter<"Company"> | string
    atsProvider?: StringNullableFilter<"Company"> | string | null
    crawlFrequency?: StringFilter<"Company"> | string
    lastSuccessfulCrawl?: DateTimeNullableFilter<"Company"> | Date | string | null
    apiEndpoint?: StringNullableFilter<"Company"> | string | null
    sourceFingerprint?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    website?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    country?: StringNullableFilter<"Company"> | string | null
    github?: StringNullableFilter<"Company"> | string | null
    linkedin?: StringNullableFilter<"Company"> | string | null
    crunchbase?: StringNullableFilter<"Company"> | string | null
    lastChecked?: DateTimeNullableFilter<"Company"> | Date | string | null
    status?: StringFilter<"Company"> | string
    priorityScore?: IntFilter<"Company"> | number
    jobs?: JobListRelationFilter
    crawlLogs?: CrawlLogListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    careerPageUrl?: SortOrder
    sourceType?: SortOrder
    atsProvider?: SortOrderInput | SortOrder
    crawlFrequency?: SortOrder
    lastSuccessfulCrawl?: SortOrderInput | SortOrder
    apiEndpoint?: SortOrderInput | SortOrder
    sourceFingerprint?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    website?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    github?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    crunchbase?: SortOrderInput | SortOrder
    lastChecked?: SortOrderInput | SortOrder
    status?: SortOrder
    priorityScore?: SortOrder
    jobs?: JobOrderByRelationAggregateInput
    crawlLogs?: CrawlLogOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    careerPageUrl?: StringFilter<"Company"> | string
    sourceType?: StringFilter<"Company"> | string
    atsProvider?: StringNullableFilter<"Company"> | string | null
    crawlFrequency?: StringFilter<"Company"> | string
    lastSuccessfulCrawl?: DateTimeNullableFilter<"Company"> | Date | string | null
    apiEndpoint?: StringNullableFilter<"Company"> | string | null
    sourceFingerprint?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    website?: StringNullableFilter<"Company"> | string | null
    industry?: StringNullableFilter<"Company"> | string | null
    country?: StringNullableFilter<"Company"> | string | null
    github?: StringNullableFilter<"Company"> | string | null
    linkedin?: StringNullableFilter<"Company"> | string | null
    crunchbase?: StringNullableFilter<"Company"> | string | null
    lastChecked?: DateTimeNullableFilter<"Company"> | Date | string | null
    status?: StringFilter<"Company"> | string
    priorityScore?: IntFilter<"Company"> | number
    jobs?: JobListRelationFilter
    crawlLogs?: CrawlLogListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    careerPageUrl?: SortOrder
    sourceType?: SortOrder
    atsProvider?: SortOrderInput | SortOrder
    crawlFrequency?: SortOrder
    lastSuccessfulCrawl?: SortOrderInput | SortOrder
    apiEndpoint?: SortOrderInput | SortOrder
    sourceFingerprint?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    website?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    github?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    crunchbase?: SortOrderInput | SortOrder
    lastChecked?: SortOrderInput | SortOrder
    status?: SortOrder
    priorityScore?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    careerPageUrl?: StringWithAggregatesFilter<"Company"> | string
    sourceType?: StringWithAggregatesFilter<"Company"> | string
    atsProvider?: StringNullableWithAggregatesFilter<"Company"> | string | null
    crawlFrequency?: StringWithAggregatesFilter<"Company"> | string
    lastSuccessfulCrawl?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
    apiEndpoint?: StringNullableWithAggregatesFilter<"Company"> | string | null
    sourceFingerprint?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    website?: StringNullableWithAggregatesFilter<"Company"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Company"> | string | null
    country?: StringNullableWithAggregatesFilter<"Company"> | string | null
    github?: StringNullableWithAggregatesFilter<"Company"> | string | null
    linkedin?: StringNullableWithAggregatesFilter<"Company"> | string | null
    crunchbase?: StringNullableWithAggregatesFilter<"Company"> | string | null
    lastChecked?: DateTimeNullableWithAggregatesFilter<"Company"> | Date | string | null
    status?: StringWithAggregatesFilter<"Company"> | string
    priorityScore?: IntWithAggregatesFilter<"Company"> | number
  }

  export type CareerPageWhereInput = {
    AND?: CareerPageWhereInput | CareerPageWhereInput[]
    OR?: CareerPageWhereInput[]
    NOT?: CareerPageWhereInput | CareerPageWhereInput[]
    id?: StringFilter<"CareerPage"> | string
    companyId?: StringFilter<"CareerPage"> | string
    careerUrl?: StringFilter<"CareerPage"> | string
    confidence?: FloatFilter<"CareerPage"> | number
    foundBy?: StringFilter<"CareerPage"> | string
    date?: DateTimeFilter<"CareerPage"> | Date | string
  }

  export type CareerPageOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    careerUrl?: SortOrder
    confidence?: SortOrder
    foundBy?: SortOrder
    date?: SortOrder
  }

  export type CareerPageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CareerPageWhereInput | CareerPageWhereInput[]
    OR?: CareerPageWhereInput[]
    NOT?: CareerPageWhereInput | CareerPageWhereInput[]
    companyId?: StringFilter<"CareerPage"> | string
    careerUrl?: StringFilter<"CareerPage"> | string
    confidence?: FloatFilter<"CareerPage"> | number
    foundBy?: StringFilter<"CareerPage"> | string
    date?: DateTimeFilter<"CareerPage"> | Date | string
  }, "id">

  export type CareerPageOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    careerUrl?: SortOrder
    confidence?: SortOrder
    foundBy?: SortOrder
    date?: SortOrder
    _count?: CareerPageCountOrderByAggregateInput
    _avg?: CareerPageAvgOrderByAggregateInput
    _max?: CareerPageMaxOrderByAggregateInput
    _min?: CareerPageMinOrderByAggregateInput
    _sum?: CareerPageSumOrderByAggregateInput
  }

  export type CareerPageScalarWhereWithAggregatesInput = {
    AND?: CareerPageScalarWhereWithAggregatesInput | CareerPageScalarWhereWithAggregatesInput[]
    OR?: CareerPageScalarWhereWithAggregatesInput[]
    NOT?: CareerPageScalarWhereWithAggregatesInput | CareerPageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CareerPage"> | string
    companyId?: StringWithAggregatesFilter<"CareerPage"> | string
    careerUrl?: StringWithAggregatesFilter<"CareerPage"> | string
    confidence?: FloatWithAggregatesFilter<"CareerPage"> | number
    foundBy?: StringWithAggregatesFilter<"CareerPage"> | string
    date?: DateTimeWithAggregatesFilter<"CareerPage"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    companyName?: StringFilter<"Job"> | string
    jobId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    employmentType?: StringNullableFilter<"Job"> | string | null
    postedTimestamp?: DateTimeNullableFilter<"Job"> | Date | string | null
    description?: StringNullableFilter<"Job"> | string | null
    url?: StringFilter<"Job"> | string
    source?: StringFilter<"Job"> | string
    hash?: StringFilter<"Job"> | string
    firstSeen?: DateTimeFilter<"Job"> | Date | string
    lastSeen?: DateTimeFilter<"Job"> | Date | string
    status?: StringFilter<"Job"> | string
    embedding?: StringNullableFilter<"Job"> | string | null
    remote?: BoolFilter<"Job"> | boolean
    salary?: StringNullableFilter<"Job"> | string | null
    department?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableFilter<"Job"> | string | null
    experience?: StringNullableFilter<"Job"> | string | null
    llmProcessed?: BoolFilter<"Job"> | boolean
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    jobSkills?: JobSkillListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    jobId?: SortOrder
    title?: SortOrder
    location?: SortOrder
    employmentType?: SortOrderInput | SortOrder
    postedTimestamp?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    url?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    firstSeen?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    embedding?: SortOrderInput | SortOrder
    remote?: SortOrder
    salary?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    llmProcessed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    jobSkills?: JobSkillOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hash?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    companyId?: StringFilter<"Job"> | string
    companyName?: StringFilter<"Job"> | string
    jobId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    employmentType?: StringNullableFilter<"Job"> | string | null
    postedTimestamp?: DateTimeNullableFilter<"Job"> | Date | string | null
    description?: StringNullableFilter<"Job"> | string | null
    url?: StringFilter<"Job"> | string
    source?: StringFilter<"Job"> | string
    firstSeen?: DateTimeFilter<"Job"> | Date | string
    lastSeen?: DateTimeFilter<"Job"> | Date | string
    status?: StringFilter<"Job"> | string
    embedding?: StringNullableFilter<"Job"> | string | null
    remote?: BoolFilter<"Job"> | boolean
    salary?: StringNullableFilter<"Job"> | string | null
    department?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableFilter<"Job"> | string | null
    experience?: StringNullableFilter<"Job"> | string | null
    llmProcessed?: BoolFilter<"Job"> | boolean
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
    jobSkills?: JobSkillListRelationFilter
  }, "id" | "hash">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    jobId?: SortOrder
    title?: SortOrder
    location?: SortOrder
    employmentType?: SortOrderInput | SortOrder
    postedTimestamp?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    url?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    firstSeen?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    embedding?: SortOrderInput | SortOrder
    remote?: SortOrder
    salary?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    llmProcessed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    companyId?: StringWithAggregatesFilter<"Job"> | string
    companyName?: StringWithAggregatesFilter<"Job"> | string
    jobId?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    location?: StringWithAggregatesFilter<"Job"> | string
    employmentType?: StringNullableWithAggregatesFilter<"Job"> | string | null
    postedTimestamp?: DateTimeNullableWithAggregatesFilter<"Job"> | Date | string | null
    description?: StringNullableWithAggregatesFilter<"Job"> | string | null
    url?: StringWithAggregatesFilter<"Job"> | string
    source?: StringWithAggregatesFilter<"Job"> | string
    hash?: StringWithAggregatesFilter<"Job"> | string
    firstSeen?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    lastSeen?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    status?: StringWithAggregatesFilter<"Job"> | string
    embedding?: StringNullableWithAggregatesFilter<"Job"> | string | null
    remote?: BoolWithAggregatesFilter<"Job"> | boolean
    salary?: StringNullableWithAggregatesFilter<"Job"> | string | null
    department?: StringNullableWithAggregatesFilter<"Job"> | string | null
    skills?: StringNullableWithAggregatesFilter<"Job"> | string | null
    experience?: StringNullableWithAggregatesFilter<"Job"> | string | null
    llmProcessed?: BoolWithAggregatesFilter<"Job"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    id?: StringFilter<"Skill"> | string
    name?: StringFilter<"Skill"> | string
    jobSkills?: JobSkillListRelationFilter
  }

  export type SkillOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    jobSkills?: JobSkillOrderByRelationAggregateInput
  }

  export type SkillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    jobSkills?: JobSkillListRelationFilter
  }, "id" | "name">

  export type SkillOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: SkillCountOrderByAggregateInput
    _max?: SkillMaxOrderByAggregateInput
    _min?: SkillMinOrderByAggregateInput
  }

  export type SkillScalarWhereWithAggregatesInput = {
    AND?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    OR?: SkillScalarWhereWithAggregatesInput[]
    NOT?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Skill"> | string
    name?: StringWithAggregatesFilter<"Skill"> | string
  }

  export type JobSkillWhereInput = {
    AND?: JobSkillWhereInput | JobSkillWhereInput[]
    OR?: JobSkillWhereInput[]
    NOT?: JobSkillWhereInput | JobSkillWhereInput[]
    jobId?: StringFilter<"JobSkill"> | string
    skillId?: StringFilter<"JobSkill"> | string
    job?: XOR<JobRelationFilter, JobWhereInput>
    skill?: XOR<SkillRelationFilter, SkillWhereInput>
  }

  export type JobSkillOrderByWithRelationInput = {
    jobId?: SortOrder
    skillId?: SortOrder
    job?: JobOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type JobSkillWhereUniqueInput = Prisma.AtLeast<{
    jobId_skillId?: JobSkillJobIdSkillIdCompoundUniqueInput
    AND?: JobSkillWhereInput | JobSkillWhereInput[]
    OR?: JobSkillWhereInput[]
    NOT?: JobSkillWhereInput | JobSkillWhereInput[]
    jobId?: StringFilter<"JobSkill"> | string
    skillId?: StringFilter<"JobSkill"> | string
    job?: XOR<JobRelationFilter, JobWhereInput>
    skill?: XOR<SkillRelationFilter, SkillWhereInput>
  }, "jobId_skillId">

  export type JobSkillOrderByWithAggregationInput = {
    jobId?: SortOrder
    skillId?: SortOrder
    _count?: JobSkillCountOrderByAggregateInput
    _max?: JobSkillMaxOrderByAggregateInput
    _min?: JobSkillMinOrderByAggregateInput
  }

  export type JobSkillScalarWhereWithAggregatesInput = {
    AND?: JobSkillScalarWhereWithAggregatesInput | JobSkillScalarWhereWithAggregatesInput[]
    OR?: JobSkillScalarWhereWithAggregatesInput[]
    NOT?: JobSkillScalarWhereWithAggregatesInput | JobSkillScalarWhereWithAggregatesInput[]
    jobId?: StringWithAggregatesFilter<"JobSkill"> | string
    skillId?: StringWithAggregatesFilter<"JobSkill"> | string
  }

  export type CrawlLogWhereInput = {
    AND?: CrawlLogWhereInput | CrawlLogWhereInput[]
    OR?: CrawlLogWhereInput[]
    NOT?: CrawlLogWhereInput | CrawlLogWhereInput[]
    id?: StringFilter<"CrawlLog"> | string
    companyId?: StringFilter<"CrawlLog"> | string
    status?: StringFilter<"CrawlLog"> | string
    jobsFound?: IntFilter<"CrawlLog"> | number
    jobsNew?: IntFilter<"CrawlLog"> | number
    errorMessage?: StringNullableFilter<"CrawlLog"> | string | null
    durationMs?: IntFilter<"CrawlLog"> | number
    createdAt?: DateTimeFilter<"CrawlLog"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
  }

  export type CrawlLogOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type CrawlLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CrawlLogWhereInput | CrawlLogWhereInput[]
    OR?: CrawlLogWhereInput[]
    NOT?: CrawlLogWhereInput | CrawlLogWhereInput[]
    companyId?: StringFilter<"CrawlLog"> | string
    status?: StringFilter<"CrawlLog"> | string
    jobsFound?: IntFilter<"CrawlLog"> | number
    jobsNew?: IntFilter<"CrawlLog"> | number
    errorMessage?: StringNullableFilter<"CrawlLog"> | string | null
    durationMs?: IntFilter<"CrawlLog"> | number
    createdAt?: DateTimeFilter<"CrawlLog"> | Date | string
    company?: XOR<CompanyRelationFilter, CompanyWhereInput>
  }, "id">

  export type CrawlLogOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
    _count?: CrawlLogCountOrderByAggregateInput
    _avg?: CrawlLogAvgOrderByAggregateInput
    _max?: CrawlLogMaxOrderByAggregateInput
    _min?: CrawlLogMinOrderByAggregateInput
    _sum?: CrawlLogSumOrderByAggregateInput
  }

  export type CrawlLogScalarWhereWithAggregatesInput = {
    AND?: CrawlLogScalarWhereWithAggregatesInput | CrawlLogScalarWhereWithAggregatesInput[]
    OR?: CrawlLogScalarWhereWithAggregatesInput[]
    NOT?: CrawlLogScalarWhereWithAggregatesInput | CrawlLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CrawlLog"> | string
    companyId?: StringWithAggregatesFilter<"CrawlLog"> | string
    status?: StringWithAggregatesFilter<"CrawlLog"> | string
    jobsFound?: IntWithAggregatesFilter<"CrawlLog"> | number
    jobsNew?: IntWithAggregatesFilter<"CrawlLog"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"CrawlLog"> | string | null
    durationMs?: IntWithAggregatesFilter<"CrawlLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CrawlLog"> | Date | string
  }

  export type CrawlQueueWhereInput = {
    AND?: CrawlQueueWhereInput | CrawlQueueWhereInput[]
    OR?: CrawlQueueWhereInput[]
    NOT?: CrawlQueueWhereInput | CrawlQueueWhereInput[]
    id?: StringFilter<"CrawlQueue"> | string
    companyId?: StringFilter<"CrawlQueue"> | string
    status?: StringFilter<"CrawlQueue"> | string
    attempts?: IntFilter<"CrawlQueue"> | number
    runAfter?: DateTimeFilter<"CrawlQueue"> | Date | string
    createdAt?: DateTimeFilter<"CrawlQueue"> | Date | string
  }

  export type CrawlQueueOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    runAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CrawlQueueWhereInput | CrawlQueueWhereInput[]
    OR?: CrawlQueueWhereInput[]
    NOT?: CrawlQueueWhereInput | CrawlQueueWhereInput[]
    companyId?: StringFilter<"CrawlQueue"> | string
    status?: StringFilter<"CrawlQueue"> | string
    attempts?: IntFilter<"CrawlQueue"> | number
    runAfter?: DateTimeFilter<"CrawlQueue"> | Date | string
    createdAt?: DateTimeFilter<"CrawlQueue"> | Date | string
  }, "id">

  export type CrawlQueueOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    runAfter?: SortOrder
    createdAt?: SortOrder
    _count?: CrawlQueueCountOrderByAggregateInput
    _avg?: CrawlQueueAvgOrderByAggregateInput
    _max?: CrawlQueueMaxOrderByAggregateInput
    _min?: CrawlQueueMinOrderByAggregateInput
    _sum?: CrawlQueueSumOrderByAggregateInput
  }

  export type CrawlQueueScalarWhereWithAggregatesInput = {
    AND?: CrawlQueueScalarWhereWithAggregatesInput | CrawlQueueScalarWhereWithAggregatesInput[]
    OR?: CrawlQueueScalarWhereWithAggregatesInput[]
    NOT?: CrawlQueueScalarWhereWithAggregatesInput | CrawlQueueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CrawlQueue"> | string
    companyId?: StringWithAggregatesFilter<"CrawlQueue"> | string
    status?: StringWithAggregatesFilter<"CrawlQueue"> | string
    attempts?: IntWithAggregatesFilter<"CrawlQueue"> | number
    runAfter?: DateTimeWithAggregatesFilter<"CrawlQueue"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"CrawlQueue"> | Date | string
  }

  export type CompanySourceWhereInput = {
    AND?: CompanySourceWhereInput | CompanySourceWhereInput[]
    OR?: CompanySourceWhereInput[]
    NOT?: CompanySourceWhereInput | CompanySourceWhereInput[]
    id?: StringFilter<"CompanySource"> | string
    companyId?: StringFilter<"CompanySource"> | string
    sourceName?: StringFilter<"CompanySource"> | string
  }

  export type CompanySourceOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    sourceName?: SortOrder
  }

  export type CompanySourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompanySourceWhereInput | CompanySourceWhereInput[]
    OR?: CompanySourceWhereInput[]
    NOT?: CompanySourceWhereInput | CompanySourceWhereInput[]
    companyId?: StringFilter<"CompanySource"> | string
    sourceName?: StringFilter<"CompanySource"> | string
  }, "id">

  export type CompanySourceOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    sourceName?: SortOrder
    _count?: CompanySourceCountOrderByAggregateInput
    _max?: CompanySourceMaxOrderByAggregateInput
    _min?: CompanySourceMinOrderByAggregateInput
  }

  export type CompanySourceScalarWhereWithAggregatesInput = {
    AND?: CompanySourceScalarWhereWithAggregatesInput | CompanySourceScalarWhereWithAggregatesInput[]
    OR?: CompanySourceScalarWhereWithAggregatesInput[]
    NOT?: CompanySourceScalarWhereWithAggregatesInput | CompanySourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanySource"> | string
    companyId?: StringWithAggregatesFilter<"CompanySource"> | string
    sourceName?: StringWithAggregatesFilter<"CompanySource"> | string
  }

  export type CompanyAliasWhereInput = {
    AND?: CompanyAliasWhereInput | CompanyAliasWhereInput[]
    OR?: CompanyAliasWhereInput[]
    NOT?: CompanyAliasWhereInput | CompanyAliasWhereInput[]
    id?: StringFilter<"CompanyAlias"> | string
    companyId?: StringFilter<"CompanyAlias"> | string
    aliasName?: StringFilter<"CompanyAlias"> | string
  }

  export type CompanyAliasOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    aliasName?: SortOrder
  }

  export type CompanyAliasWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    aliasName?: string
    AND?: CompanyAliasWhereInput | CompanyAliasWhereInput[]
    OR?: CompanyAliasWhereInput[]
    NOT?: CompanyAliasWhereInput | CompanyAliasWhereInput[]
    companyId?: StringFilter<"CompanyAlias"> | string
  }, "id" | "aliasName">

  export type CompanyAliasOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    aliasName?: SortOrder
    _count?: CompanyAliasCountOrderByAggregateInput
    _max?: CompanyAliasMaxOrderByAggregateInput
    _min?: CompanyAliasMinOrderByAggregateInput
  }

  export type CompanyAliasScalarWhereWithAggregatesInput = {
    AND?: CompanyAliasScalarWhereWithAggregatesInput | CompanyAliasScalarWhereWithAggregatesInput[]
    OR?: CompanyAliasScalarWhereWithAggregatesInput[]
    NOT?: CompanyAliasScalarWhereWithAggregatesInput | CompanyAliasScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CompanyAlias"> | string
    companyId?: StringWithAggregatesFilter<"CompanyAlias"> | string
    aliasName?: StringWithAggregatesFilter<"CompanyAlias"> | string
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: StringFilter<"Settings"> | string
    dataJson?: StringFilter<"Settings"> | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    dataJson?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    dataJson?: StringFilter<"Settings"> | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }, "id">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    dataJson?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Settings"> | string
    dataJson?: StringWithAggregatesFilter<"Settings"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
    jobs?: JobCreateNestedManyWithoutCompanyInput
    crawlLogs?: CrawlLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
    crawlLogs?: CrawlLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
    jobs?: JobUpdateManyWithoutCompanyNestedInput
    crawlLogs?: CrawlLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
    crawlLogs?: CrawlLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
  }

  export type CareerPageCreateInput = {
    id?: string
    companyId: string
    careerUrl: string
    confidence?: number
    foundBy: string
    date?: Date | string
  }

  export type CareerPageUncheckedCreateInput = {
    id?: string
    companyId: string
    careerUrl: string
    confidence?: number
    foundBy: string
    date?: Date | string
  }

  export type CareerPageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    careerUrl?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    foundBy?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerPageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    careerUrl?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    foundBy?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerPageCreateManyInput = {
    id?: string
    companyId: string
    careerUrl: string
    confidence?: number
    foundBy: string
    date?: Date | string
  }

  export type CareerPageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    careerUrl?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    foundBy?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerPageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    careerUrl?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    foundBy?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    id?: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
    jobSkills?: JobSkillCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    companyId: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobSkills?: JobSkillUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
    jobSkills?: JobSkillUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobSkills?: JobSkillUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    companyId: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillCreateInput = {
    id?: string
    name: string
    jobSkills?: JobSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateInput = {
    id?: string
    name: string
    jobSkills?: JobSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobSkills?: JobSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    jobSkills?: JobSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type SkillCreateManyInput = {
    id?: string
    name: string
  }

  export type SkillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SkillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type JobSkillCreateInput = {
    job: JobCreateNestedOneWithoutJobSkillsInput
    skill: SkillCreateNestedOneWithoutJobSkillsInput
  }

  export type JobSkillUncheckedCreateInput = {
    jobId: string
    skillId: string
  }

  export type JobSkillUpdateInput = {
    job?: JobUpdateOneRequiredWithoutJobSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutJobSkillsNestedInput
  }

  export type JobSkillUncheckedUpdateInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
  }

  export type JobSkillCreateManyInput = {
    jobId: string
    skillId: string
  }

  export type JobSkillUpdateManyMutationInput = {

  }

  export type JobSkillUncheckedUpdateManyInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    skillId?: StringFieldUpdateOperationsInput | string
  }

  export type CrawlLogCreateInput = {
    id?: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage?: string | null
    durationMs: number
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutCrawlLogsInput
  }

  export type CrawlLogUncheckedCreateInput = {
    id?: string
    companyId: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage?: string | null
    durationMs: number
    createdAt?: Date | string
  }

  export type CrawlLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutCrawlLogsNestedInput
  }

  export type CrawlLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlLogCreateManyInput = {
    id?: string
    companyId: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage?: string | null
    durationMs: number
    createdAt?: Date | string
  }

  export type CrawlLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlQueueCreateInput = {
    id?: string
    companyId: string
    status: string
    attempts?: number
    runAfter?: Date | string
    createdAt?: Date | string
  }

  export type CrawlQueueUncheckedCreateInput = {
    id?: string
    companyId: string
    status: string
    attempts?: number
    runAfter?: Date | string
    createdAt?: Date | string
  }

  export type CrawlQueueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    runAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlQueueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    runAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlQueueCreateManyInput = {
    id?: string
    companyId: string
    status: string
    attempts?: number
    runAfter?: Date | string
    createdAt?: Date | string
  }

  export type CrawlQueueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    runAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlQueueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    runAfter?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanySourceCreateInput = {
    id?: string
    companyId: string
    sourceName: string
  }

  export type CompanySourceUncheckedCreateInput = {
    id?: string
    companyId: string
    sourceName: string
  }

  export type CompanySourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanySourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanySourceCreateManyInput = {
    id?: string
    companyId: string
    sourceName: string
  }

  export type CompanySourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanySourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyAliasCreateInput = {
    id?: string
    companyId: string
    aliasName: string
  }

  export type CompanyAliasUncheckedCreateInput = {
    id?: string
    companyId: string
    aliasName: string
  }

  export type CompanyAliasUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    aliasName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyAliasUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    aliasName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyAliasCreateManyInput = {
    id?: string
    companyId: string
    aliasName: string
  }

  export type CompanyAliasUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    aliasName?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyAliasUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    aliasName?: StringFieldUpdateOperationsInput | string
  }

  export type SettingsCreateInput = {
    id?: string
    dataJson: string
    updatedAt?: Date | string
  }

  export type SettingsUncheckedCreateInput = {
    id?: string
    dataJson: string
    updatedAt?: Date | string
  }

  export type SettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateManyInput = {
    id?: string
    dataJson: string
    updatedAt?: Date | string
  }

  export type SettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dataJson?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type CrawlLogListRelationFilter = {
    every?: CrawlLogWhereInput
    some?: CrawlLogWhereInput
    none?: CrawlLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CrawlLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    careerPageUrl?: SortOrder
    sourceType?: SortOrder
    atsProvider?: SortOrder
    crawlFrequency?: SortOrder
    lastSuccessfulCrawl?: SortOrder
    apiEndpoint?: SortOrder
    sourceFingerprint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    website?: SortOrder
    industry?: SortOrder
    country?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    crunchbase?: SortOrder
    lastChecked?: SortOrder
    status?: SortOrder
    priorityScore?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    priorityScore?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    careerPageUrl?: SortOrder
    sourceType?: SortOrder
    atsProvider?: SortOrder
    crawlFrequency?: SortOrder
    lastSuccessfulCrawl?: SortOrder
    apiEndpoint?: SortOrder
    sourceFingerprint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    website?: SortOrder
    industry?: SortOrder
    country?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    crunchbase?: SortOrder
    lastChecked?: SortOrder
    status?: SortOrder
    priorityScore?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    careerPageUrl?: SortOrder
    sourceType?: SortOrder
    atsProvider?: SortOrder
    crawlFrequency?: SortOrder
    lastSuccessfulCrawl?: SortOrder
    apiEndpoint?: SortOrder
    sourceFingerprint?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    website?: SortOrder
    industry?: SortOrder
    country?: SortOrder
    github?: SortOrder
    linkedin?: SortOrder
    crunchbase?: SortOrder
    lastChecked?: SortOrder
    status?: SortOrder
    priorityScore?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    priorityScore?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CareerPageCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    careerUrl?: SortOrder
    confidence?: SortOrder
    foundBy?: SortOrder
    date?: SortOrder
  }

  export type CareerPageAvgOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type CareerPageMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    careerUrl?: SortOrder
    confidence?: SortOrder
    foundBy?: SortOrder
    date?: SortOrder
  }

  export type CareerPageMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    careerUrl?: SortOrder
    confidence?: SortOrder
    foundBy?: SortOrder
    date?: SortOrder
  }

  export type CareerPageSumOrderByAggregateInput = {
    confidence?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CompanyRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type JobSkillListRelationFilter = {
    every?: JobSkillWhereInput
    some?: JobSkillWhereInput
    none?: JobSkillWhereInput
  }

  export type JobSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    jobId?: SortOrder
    title?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    postedTimestamp?: SortOrder
    description?: SortOrder
    url?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    firstSeen?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    embedding?: SortOrder
    remote?: SortOrder
    salary?: SortOrder
    department?: SortOrder
    skills?: SortOrder
    experience?: SortOrder
    llmProcessed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    jobId?: SortOrder
    title?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    postedTimestamp?: SortOrder
    description?: SortOrder
    url?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    firstSeen?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    embedding?: SortOrder
    remote?: SortOrder
    salary?: SortOrder
    department?: SortOrder
    skills?: SortOrder
    experience?: SortOrder
    llmProcessed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    companyName?: SortOrder
    jobId?: SortOrder
    title?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    postedTimestamp?: SortOrder
    description?: SortOrder
    url?: SortOrder
    source?: SortOrder
    hash?: SortOrder
    firstSeen?: SortOrder
    lastSeen?: SortOrder
    status?: SortOrder
    embedding?: SortOrder
    remote?: SortOrder
    salary?: SortOrder
    department?: SortOrder
    skills?: SortOrder
    experience?: SortOrder
    llmProcessed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SkillCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SkillMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SkillMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type JobRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type SkillRelationFilter = {
    is?: SkillWhereInput
    isNot?: SkillWhereInput
  }

  export type JobSkillJobIdSkillIdCompoundUniqueInput = {
    jobId: string
    skillId: string
  }

  export type JobSkillCountOrderByAggregateInput = {
    jobId?: SortOrder
    skillId?: SortOrder
  }

  export type JobSkillMaxOrderByAggregateInput = {
    jobId?: SortOrder
    skillId?: SortOrder
  }

  export type JobSkillMinOrderByAggregateInput = {
    jobId?: SortOrder
    skillId?: SortOrder
  }

  export type CrawlLogCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    errorMessage?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlLogAvgOrderByAggregateInput = {
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    durationMs?: SortOrder
  }

  export type CrawlLogMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    errorMessage?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlLogMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    errorMessage?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlLogSumOrderByAggregateInput = {
    jobsFound?: SortOrder
    jobsNew?: SortOrder
    durationMs?: SortOrder
  }

  export type CrawlQueueCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    runAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlQueueAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type CrawlQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    runAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlQueueMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    runAfter?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlQueueSumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type CompanySourceCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    sourceName?: SortOrder
  }

  export type CompanySourceMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    sourceName?: SortOrder
  }

  export type CompanySourceMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    sourceName?: SortOrder
  }

  export type CompanyAliasCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    aliasName?: SortOrder
  }

  export type CompanyAliasMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    aliasName?: SortOrder
  }

  export type CompanyAliasMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    aliasName?: SortOrder
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    dataJson?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    dataJson?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    dataJson?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type CrawlLogCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CrawlLogCreateWithoutCompanyInput, CrawlLogUncheckedCreateWithoutCompanyInput> | CrawlLogCreateWithoutCompanyInput[] | CrawlLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CrawlLogCreateOrConnectWithoutCompanyInput | CrawlLogCreateOrConnectWithoutCompanyInput[]
    createMany?: CrawlLogCreateManyCompanyInputEnvelope
    connect?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type CrawlLogUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CrawlLogCreateWithoutCompanyInput, CrawlLogUncheckedCreateWithoutCompanyInput> | CrawlLogCreateWithoutCompanyInput[] | CrawlLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CrawlLogCreateOrConnectWithoutCompanyInput | CrawlLogCreateOrConnectWithoutCompanyInput[]
    createMany?: CrawlLogCreateManyCompanyInputEnvelope
    connect?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type CrawlLogUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CrawlLogCreateWithoutCompanyInput, CrawlLogUncheckedCreateWithoutCompanyInput> | CrawlLogCreateWithoutCompanyInput[] | CrawlLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CrawlLogCreateOrConnectWithoutCompanyInput | CrawlLogCreateOrConnectWithoutCompanyInput[]
    upsert?: CrawlLogUpsertWithWhereUniqueWithoutCompanyInput | CrawlLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CrawlLogCreateManyCompanyInputEnvelope
    set?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    disconnect?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    delete?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    connect?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    update?: CrawlLogUpdateWithWhereUniqueWithoutCompanyInput | CrawlLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CrawlLogUpdateManyWithWhereWithoutCompanyInput | CrawlLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CrawlLogScalarWhereInput | CrawlLogScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput> | JobCreateWithoutCompanyInput[] | JobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: JobCreateOrConnectWithoutCompanyInput | JobCreateOrConnectWithoutCompanyInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutCompanyInput | JobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: JobCreateManyCompanyInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutCompanyInput | JobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: JobUpdateManyWithWhereWithoutCompanyInput | JobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type CrawlLogUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CrawlLogCreateWithoutCompanyInput, CrawlLogUncheckedCreateWithoutCompanyInput> | CrawlLogCreateWithoutCompanyInput[] | CrawlLogUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CrawlLogCreateOrConnectWithoutCompanyInput | CrawlLogCreateOrConnectWithoutCompanyInput[]
    upsert?: CrawlLogUpsertWithWhereUniqueWithoutCompanyInput | CrawlLogUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CrawlLogCreateManyCompanyInputEnvelope
    set?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    disconnect?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    delete?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    connect?: CrawlLogWhereUniqueInput | CrawlLogWhereUniqueInput[]
    update?: CrawlLogUpdateWithWhereUniqueWithoutCompanyInput | CrawlLogUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CrawlLogUpdateManyWithWhereWithoutCompanyInput | CrawlLogUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CrawlLogScalarWhereInput | CrawlLogScalarWhereInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CompanyCreateNestedOneWithoutJobsInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    connect?: CompanyWhereUniqueInput
  }

  export type JobSkillCreateNestedManyWithoutJobInput = {
    create?: XOR<JobSkillCreateWithoutJobInput, JobSkillUncheckedCreateWithoutJobInput> | JobSkillCreateWithoutJobInput[] | JobSkillUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutJobInput | JobSkillCreateOrConnectWithoutJobInput[]
    createMany?: JobSkillCreateManyJobInputEnvelope
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
  }

  export type JobSkillUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<JobSkillCreateWithoutJobInput, JobSkillUncheckedCreateWithoutJobInput> | JobSkillCreateWithoutJobInput[] | JobSkillUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutJobInput | JobSkillCreateOrConnectWithoutJobInput[]
    createMany?: JobSkillCreateManyJobInputEnvelope
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CompanyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutJobsInput
    upsert?: CompanyUpsertWithoutJobsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutJobsInput, CompanyUpdateWithoutJobsInput>, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type JobSkillUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobSkillCreateWithoutJobInput, JobSkillUncheckedCreateWithoutJobInput> | JobSkillCreateWithoutJobInput[] | JobSkillUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutJobInput | JobSkillCreateOrConnectWithoutJobInput[]
    upsert?: JobSkillUpsertWithWhereUniqueWithoutJobInput | JobSkillUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobSkillCreateManyJobInputEnvelope
    set?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    disconnect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    delete?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    update?: JobSkillUpdateWithWhereUniqueWithoutJobInput | JobSkillUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobSkillUpdateManyWithWhereWithoutJobInput | JobSkillUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobSkillScalarWhereInput | JobSkillScalarWhereInput[]
  }

  export type JobSkillUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobSkillCreateWithoutJobInput, JobSkillUncheckedCreateWithoutJobInput> | JobSkillCreateWithoutJobInput[] | JobSkillUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutJobInput | JobSkillCreateOrConnectWithoutJobInput[]
    upsert?: JobSkillUpsertWithWhereUniqueWithoutJobInput | JobSkillUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobSkillCreateManyJobInputEnvelope
    set?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    disconnect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    delete?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    update?: JobSkillUpdateWithWhereUniqueWithoutJobInput | JobSkillUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobSkillUpdateManyWithWhereWithoutJobInput | JobSkillUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobSkillScalarWhereInput | JobSkillScalarWhereInput[]
  }

  export type JobSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<JobSkillCreateWithoutSkillInput, JobSkillUncheckedCreateWithoutSkillInput> | JobSkillCreateWithoutSkillInput[] | JobSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutSkillInput | JobSkillCreateOrConnectWithoutSkillInput[]
    createMany?: JobSkillCreateManySkillInputEnvelope
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
  }

  export type JobSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<JobSkillCreateWithoutSkillInput, JobSkillUncheckedCreateWithoutSkillInput> | JobSkillCreateWithoutSkillInput[] | JobSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutSkillInput | JobSkillCreateOrConnectWithoutSkillInput[]
    createMany?: JobSkillCreateManySkillInputEnvelope
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
  }

  export type JobSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<JobSkillCreateWithoutSkillInput, JobSkillUncheckedCreateWithoutSkillInput> | JobSkillCreateWithoutSkillInput[] | JobSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutSkillInput | JobSkillCreateOrConnectWithoutSkillInput[]
    upsert?: JobSkillUpsertWithWhereUniqueWithoutSkillInput | JobSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: JobSkillCreateManySkillInputEnvelope
    set?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    disconnect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    delete?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    update?: JobSkillUpdateWithWhereUniqueWithoutSkillInput | JobSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: JobSkillUpdateManyWithWhereWithoutSkillInput | JobSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: JobSkillScalarWhereInput | JobSkillScalarWhereInput[]
  }

  export type JobSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<JobSkillCreateWithoutSkillInput, JobSkillUncheckedCreateWithoutSkillInput> | JobSkillCreateWithoutSkillInput[] | JobSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSkillCreateOrConnectWithoutSkillInput | JobSkillCreateOrConnectWithoutSkillInput[]
    upsert?: JobSkillUpsertWithWhereUniqueWithoutSkillInput | JobSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: JobSkillCreateManySkillInputEnvelope
    set?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    disconnect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    delete?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    connect?: JobSkillWhereUniqueInput | JobSkillWhereUniqueInput[]
    update?: JobSkillUpdateWithWhereUniqueWithoutSkillInput | JobSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: JobSkillUpdateManyWithWhereWithoutSkillInput | JobSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: JobSkillScalarWhereInput | JobSkillScalarWhereInput[]
  }

  export type JobCreateNestedOneWithoutJobSkillsInput = {
    create?: XOR<JobCreateWithoutJobSkillsInput, JobUncheckedCreateWithoutJobSkillsInput>
    connectOrCreate?: JobCreateOrConnectWithoutJobSkillsInput
    connect?: JobWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutJobSkillsInput = {
    create?: XOR<SkillCreateWithoutJobSkillsInput, SkillUncheckedCreateWithoutJobSkillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutJobSkillsInput
    connect?: SkillWhereUniqueInput
  }

  export type JobUpdateOneRequiredWithoutJobSkillsNestedInput = {
    create?: XOR<JobCreateWithoutJobSkillsInput, JobUncheckedCreateWithoutJobSkillsInput>
    connectOrCreate?: JobCreateOrConnectWithoutJobSkillsInput
    upsert?: JobUpsertWithoutJobSkillsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutJobSkillsInput, JobUpdateWithoutJobSkillsInput>, JobUncheckedUpdateWithoutJobSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutJobSkillsNestedInput = {
    create?: XOR<SkillCreateWithoutJobSkillsInput, SkillUncheckedCreateWithoutJobSkillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutJobSkillsInput
    upsert?: SkillUpsertWithoutJobSkillsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutJobSkillsInput, SkillUpdateWithoutJobSkillsInput>, SkillUncheckedUpdateWithoutJobSkillsInput>
  }

  export type CompanyCreateNestedOneWithoutCrawlLogsInput = {
    create?: XOR<CompanyCreateWithoutCrawlLogsInput, CompanyUncheckedCreateWithoutCrawlLogsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCrawlLogsInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutCrawlLogsNestedInput = {
    create?: XOR<CompanyCreateWithoutCrawlLogsInput, CompanyUncheckedCreateWithoutCrawlLogsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutCrawlLogsInput
    upsert?: CompanyUpsertWithoutCrawlLogsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutCrawlLogsInput, CompanyUpdateWithoutCrawlLogsInput>, CompanyUncheckedUpdateWithoutCrawlLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JobCreateWithoutCompanyInput = {
    id?: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobSkills?: JobSkillCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutCompanyInput = {
    id?: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    jobSkills?: JobSkillUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutCompanyInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobCreateManyCompanyInputEnvelope = {
    data: JobCreateManyCompanyInput | JobCreateManyCompanyInput[]
  }

  export type CrawlLogCreateWithoutCompanyInput = {
    id?: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage?: string | null
    durationMs: number
    createdAt?: Date | string
  }

  export type CrawlLogUncheckedCreateWithoutCompanyInput = {
    id?: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage?: string | null
    durationMs: number
    createdAt?: Date | string
  }

  export type CrawlLogCreateOrConnectWithoutCompanyInput = {
    where: CrawlLogWhereUniqueInput
    create: XOR<CrawlLogCreateWithoutCompanyInput, CrawlLogUncheckedCreateWithoutCompanyInput>
  }

  export type CrawlLogCreateManyCompanyInputEnvelope = {
    data: CrawlLogCreateManyCompanyInput | CrawlLogCreateManyCompanyInput[]
  }

  export type JobUpsertWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
    create: XOR<JobCreateWithoutCompanyInput, JobUncheckedCreateWithoutCompanyInput>
  }

  export type JobUpdateWithWhereUniqueWithoutCompanyInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutCompanyInput, JobUncheckedUpdateWithoutCompanyInput>
  }

  export type JobUpdateManyWithWhereWithoutCompanyInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutCompanyInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    companyId?: StringFilter<"Job"> | string
    companyName?: StringFilter<"Job"> | string
    jobId?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    employmentType?: StringNullableFilter<"Job"> | string | null
    postedTimestamp?: DateTimeNullableFilter<"Job"> | Date | string | null
    description?: StringNullableFilter<"Job"> | string | null
    url?: StringFilter<"Job"> | string
    source?: StringFilter<"Job"> | string
    hash?: StringFilter<"Job"> | string
    firstSeen?: DateTimeFilter<"Job"> | Date | string
    lastSeen?: DateTimeFilter<"Job"> | Date | string
    status?: StringFilter<"Job"> | string
    embedding?: StringNullableFilter<"Job"> | string | null
    remote?: BoolFilter<"Job"> | boolean
    salary?: StringNullableFilter<"Job"> | string | null
    department?: StringNullableFilter<"Job"> | string | null
    skills?: StringNullableFilter<"Job"> | string | null
    experience?: StringNullableFilter<"Job"> | string | null
    llmProcessed?: BoolFilter<"Job"> | boolean
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type CrawlLogUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CrawlLogWhereUniqueInput
    update: XOR<CrawlLogUpdateWithoutCompanyInput, CrawlLogUncheckedUpdateWithoutCompanyInput>
    create: XOR<CrawlLogCreateWithoutCompanyInput, CrawlLogUncheckedCreateWithoutCompanyInput>
  }

  export type CrawlLogUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CrawlLogWhereUniqueInput
    data: XOR<CrawlLogUpdateWithoutCompanyInput, CrawlLogUncheckedUpdateWithoutCompanyInput>
  }

  export type CrawlLogUpdateManyWithWhereWithoutCompanyInput = {
    where: CrawlLogScalarWhereInput
    data: XOR<CrawlLogUpdateManyMutationInput, CrawlLogUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CrawlLogScalarWhereInput = {
    AND?: CrawlLogScalarWhereInput | CrawlLogScalarWhereInput[]
    OR?: CrawlLogScalarWhereInput[]
    NOT?: CrawlLogScalarWhereInput | CrawlLogScalarWhereInput[]
    id?: StringFilter<"CrawlLog"> | string
    companyId?: StringFilter<"CrawlLog"> | string
    status?: StringFilter<"CrawlLog"> | string
    jobsFound?: IntFilter<"CrawlLog"> | number
    jobsNew?: IntFilter<"CrawlLog"> | number
    errorMessage?: StringNullableFilter<"CrawlLog"> | string | null
    durationMs?: IntFilter<"CrawlLog"> | number
    createdAt?: DateTimeFilter<"CrawlLog"> | Date | string
  }

  export type CompanyCreateWithoutJobsInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
    crawlLogs?: CrawlLogCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
    crawlLogs?: CrawlLogUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutJobsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
  }

  export type JobSkillCreateWithoutJobInput = {
    skill: SkillCreateNestedOneWithoutJobSkillsInput
  }

  export type JobSkillUncheckedCreateWithoutJobInput = {
    skillId: string
  }

  export type JobSkillCreateOrConnectWithoutJobInput = {
    where: JobSkillWhereUniqueInput
    create: XOR<JobSkillCreateWithoutJobInput, JobSkillUncheckedCreateWithoutJobInput>
  }

  export type JobSkillCreateManyJobInputEnvelope = {
    data: JobSkillCreateManyJobInput | JobSkillCreateManyJobInput[]
  }

  export type CompanyUpsertWithoutJobsInput = {
    update: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
    create: XOR<CompanyCreateWithoutJobsInput, CompanyUncheckedCreateWithoutJobsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutJobsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutJobsInput, CompanyUncheckedUpdateWithoutJobsInput>
  }

  export type CompanyUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
    crawlLogs?: CrawlLogUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
    crawlLogs?: CrawlLogUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type JobSkillUpsertWithWhereUniqueWithoutJobInput = {
    where: JobSkillWhereUniqueInput
    update: XOR<JobSkillUpdateWithoutJobInput, JobSkillUncheckedUpdateWithoutJobInput>
    create: XOR<JobSkillCreateWithoutJobInput, JobSkillUncheckedCreateWithoutJobInput>
  }

  export type JobSkillUpdateWithWhereUniqueWithoutJobInput = {
    where: JobSkillWhereUniqueInput
    data: XOR<JobSkillUpdateWithoutJobInput, JobSkillUncheckedUpdateWithoutJobInput>
  }

  export type JobSkillUpdateManyWithWhereWithoutJobInput = {
    where: JobSkillScalarWhereInput
    data: XOR<JobSkillUpdateManyMutationInput, JobSkillUncheckedUpdateManyWithoutJobInput>
  }

  export type JobSkillScalarWhereInput = {
    AND?: JobSkillScalarWhereInput | JobSkillScalarWhereInput[]
    OR?: JobSkillScalarWhereInput[]
    NOT?: JobSkillScalarWhereInput | JobSkillScalarWhereInput[]
    jobId?: StringFilter<"JobSkill"> | string
    skillId?: StringFilter<"JobSkill"> | string
  }

  export type JobSkillCreateWithoutSkillInput = {
    job: JobCreateNestedOneWithoutJobSkillsInput
  }

  export type JobSkillUncheckedCreateWithoutSkillInput = {
    jobId: string
  }

  export type JobSkillCreateOrConnectWithoutSkillInput = {
    where: JobSkillWhereUniqueInput
    create: XOR<JobSkillCreateWithoutSkillInput, JobSkillUncheckedCreateWithoutSkillInput>
  }

  export type JobSkillCreateManySkillInputEnvelope = {
    data: JobSkillCreateManySkillInput | JobSkillCreateManySkillInput[]
  }

  export type JobSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: JobSkillWhereUniqueInput
    update: XOR<JobSkillUpdateWithoutSkillInput, JobSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<JobSkillCreateWithoutSkillInput, JobSkillUncheckedCreateWithoutSkillInput>
  }

  export type JobSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: JobSkillWhereUniqueInput
    data: XOR<JobSkillUpdateWithoutSkillInput, JobSkillUncheckedUpdateWithoutSkillInput>
  }

  export type JobSkillUpdateManyWithWhereWithoutSkillInput = {
    where: JobSkillScalarWhereInput
    data: XOR<JobSkillUpdateManyMutationInput, JobSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type JobCreateWithoutJobSkillsInput = {
    id?: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateWithoutJobSkillsInput = {
    id?: string
    companyId: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateOrConnectWithoutJobSkillsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutJobSkillsInput, JobUncheckedCreateWithoutJobSkillsInput>
  }

  export type SkillCreateWithoutJobSkillsInput = {
    id?: string
    name: string
  }

  export type SkillUncheckedCreateWithoutJobSkillsInput = {
    id?: string
    name: string
  }

  export type SkillCreateOrConnectWithoutJobSkillsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutJobSkillsInput, SkillUncheckedCreateWithoutJobSkillsInput>
  }

  export type JobUpsertWithoutJobSkillsInput = {
    update: XOR<JobUpdateWithoutJobSkillsInput, JobUncheckedUpdateWithoutJobSkillsInput>
    create: XOR<JobCreateWithoutJobSkillsInput, JobUncheckedCreateWithoutJobSkillsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutJobSkillsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutJobSkillsInput, JobUncheckedUpdateWithoutJobSkillsInput>
  }

  export type JobUpdateWithoutJobSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateWithoutJobSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SkillUpsertWithoutJobSkillsInput = {
    update: XOR<SkillUpdateWithoutJobSkillsInput, SkillUncheckedUpdateWithoutJobSkillsInput>
    create: XOR<SkillCreateWithoutJobSkillsInput, SkillUncheckedCreateWithoutJobSkillsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutJobSkillsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutJobSkillsInput, SkillUncheckedUpdateWithoutJobSkillsInput>
  }

  export type SkillUpdateWithoutJobSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SkillUncheckedUpdateWithoutJobSkillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCreateWithoutCrawlLogsInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
    jobs?: JobCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutCrawlLogsInput = {
    id?: string
    name: string
    careerPageUrl: string
    sourceType: string
    atsProvider?: string | null
    crawlFrequency: string
    lastSuccessfulCrawl?: Date | string | null
    apiEndpoint?: string | null
    sourceFingerprint?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    website?: string | null
    industry?: string | null
    country?: string | null
    github?: string | null
    linkedin?: string | null
    crunchbase?: string | null
    lastChecked?: Date | string | null
    status?: string
    priorityScore?: number
    jobs?: JobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutCrawlLogsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutCrawlLogsInput, CompanyUncheckedCreateWithoutCrawlLogsInput>
  }

  export type CompanyUpsertWithoutCrawlLogsInput = {
    update: XOR<CompanyUpdateWithoutCrawlLogsInput, CompanyUncheckedUpdateWithoutCrawlLogsInput>
    create: XOR<CompanyCreateWithoutCrawlLogsInput, CompanyUncheckedCreateWithoutCrawlLogsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutCrawlLogsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutCrawlLogsInput, CompanyUncheckedUpdateWithoutCrawlLogsInput>
  }

  export type CompanyUpdateWithoutCrawlLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
    jobs?: JobUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutCrawlLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    careerPageUrl?: StringFieldUpdateOperationsInput | string
    sourceType?: StringFieldUpdateOperationsInput | string
    atsProvider?: NullableStringFieldUpdateOperationsInput | string | null
    crawlFrequency?: StringFieldUpdateOperationsInput | string
    lastSuccessfulCrawl?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    apiEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    sourceFingerprint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    github?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    crunchbase?: NullableStringFieldUpdateOperationsInput | string | null
    lastChecked?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    priorityScore?: IntFieldUpdateOperationsInput | number
    jobs?: JobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type JobCreateManyCompanyInput = {
    id?: string
    companyName: string
    jobId: string
    title: string
    location: string
    employmentType?: string | null
    postedTimestamp?: Date | string | null
    description?: string | null
    url: string
    source: string
    hash: string
    firstSeen?: Date | string
    lastSeen?: Date | string
    status?: string
    embedding?: string | null
    remote?: boolean
    salary?: string | null
    department?: string | null
    skills?: string | null
    experience?: string | null
    llmProcessed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CrawlLogCreateManyCompanyInput = {
    id?: string
    status: string
    jobsFound: number
    jobsNew: number
    errorMessage?: string | null
    durationMs: number
    createdAt?: Date | string
  }

  export type JobUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobSkills?: JobSkillUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobSkills?: JobSkillUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: NullableStringFieldUpdateOperationsInput | string | null
    postedTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    firstSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    embedding?: NullableStringFieldUpdateOperationsInput | string | null
    remote?: BoolFieldUpdateOperationsInput | boolean
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableStringFieldUpdateOperationsInput | string | null
    experience?: NullableStringFieldUpdateOperationsInput | string | null
    llmProcessed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlLogUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlLogUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlLogUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    jobsFound?: IntFieldUpdateOperationsInput | number
    jobsNew?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    durationMs?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobSkillCreateManyJobInput = {
    skillId: string
  }

  export type JobSkillUpdateWithoutJobInput = {
    skill?: SkillUpdateOneRequiredWithoutJobSkillsNestedInput
  }

  export type JobSkillUncheckedUpdateWithoutJobInput = {
    skillId?: StringFieldUpdateOperationsInput | string
  }

  export type JobSkillUncheckedUpdateManyWithoutJobInput = {
    skillId?: StringFieldUpdateOperationsInput | string
  }

  export type JobSkillCreateManySkillInput = {
    jobId: string
  }

  export type JobSkillUpdateWithoutSkillInput = {
    job?: JobUpdateOneRequiredWithoutJobSkillsNestedInput
  }

  export type JobSkillUncheckedUpdateWithoutSkillInput = {
    jobId?: StringFieldUpdateOperationsInput | string
  }

  export type JobSkillUncheckedUpdateManyWithoutSkillInput = {
    jobId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CompanyCountOutputTypeDefaultArgs instead
     */
    export type CompanyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobCountOutputTypeDefaultArgs instead
     */
    export type JobCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SkillCountOutputTypeDefaultArgs instead
     */
    export type SkillCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SkillCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyDefaultArgs instead
     */
    export type CompanyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerPageDefaultArgs instead
     */
    export type CareerPageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerPageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobDefaultArgs instead
     */
    export type JobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SkillDefaultArgs instead
     */
    export type SkillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SkillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobSkillDefaultArgs instead
     */
    export type JobSkillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobSkillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CrawlLogDefaultArgs instead
     */
    export type CrawlLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CrawlLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CrawlQueueDefaultArgs instead
     */
    export type CrawlQueueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CrawlQueueDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanySourceDefaultArgs instead
     */
    export type CompanySourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanySourceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CompanyAliasDefaultArgs instead
     */
    export type CompanyAliasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CompanyAliasDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingsDefaultArgs instead
     */
    export type SettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}