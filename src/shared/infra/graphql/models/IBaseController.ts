/**
 *  Bitloops Language
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
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
