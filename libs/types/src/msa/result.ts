export type Result<T> = {
  result: boolean;
  data?: T;
};

export type EmptyResult = Result<undefined>;

export type UidResult = Result<number>;
