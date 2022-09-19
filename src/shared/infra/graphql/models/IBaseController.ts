import { ICoreError } from '../../../core/ICoreError';

export type ErrorMessage = ICoreError;

// TODO replace all with ErrorMessage
export interface IBaseController<TRequest, TResponseData> {
  execute(req: TRequest): Promise<TResponseData>;

  //   jsonResponse(res: Res, code: number, message: string);

  ok(dto: TResponseData): TResponseData;

  created(): any;

  clientError(message: string): any;

  paymentRequired(message: string): any;

  forbidden(message: string): any;

  notFound(message?: string): any;

  conflict(message?: string): any;

  tooMany(message?: string): any;

  // todo(): any;

  fail(error: Error | string): any;
}
