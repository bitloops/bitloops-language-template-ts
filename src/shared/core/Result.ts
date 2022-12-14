/**
 * ISC License
 * Copyright (c) 2019, [Khalil Stemmler](https://khalilstemmler.com)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: T | string;
  private _value: T;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error || '';
    this._value = value || ({} as T);

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
    }

    return this._value;
  }

  public getErrorValue(): T {
    return this.error as T;
  }

  //TODO null instead of undefined
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  // TODO check if we need to always pass an argument for void
  // error: if we return right() without an argument and the function requires a return type it passes
  constructor(value?: A) {
    this.value = value || ({} as A);
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a?: A): Either<L, A> => {
  return new Right<L, A>(a);
};

export type XOR<A, L> = Oops<L, A> | Yay<L, A>;

export class Oops<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isOops(): this is Oops<L, A> {
    return true;
  }

  isYay(): this is Yay<L, A> {
    return false;
  }
}

export class Yay<L, A> {
  readonly value: A;

  constructor(value?: A) {
    this.value = value || (undefined as unknown as A);
  }

  isOops(): this is Oops<L, A> {
    return false;
  }

  isYay(): this is Yay<L, A> {
    return true;
  }
}

export const oops = <A, L>(l: L): XOR<A, L> => {
  return new Oops(l);
};

export const yay = <A, L>(a?: A): XOR<A, L> => {
  return new Yay<L, A>(a);
};
