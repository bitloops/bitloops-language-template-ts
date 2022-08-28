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
// import { IAuthConnectionService } from '../../../../BoundedContexts/gateway/infra/services/IAuthConnectionService';
// import { IAuthService } from '../../../../BoundedContexts/iam/services/IAuthService';
// import { isProduction } from '../../../../config';

export class Middleware {
  // constructor(private authService: IAuthService) {}

  private endRequest(status: 400 | 401 | 403, message: string, res: any): any {
    return res.status(status).send({ message });
  }

  // public includeDecodedTokenIfExists() {
  //   return async (req, res, next) => {
  //     const token = req.headers['authorization'];
  //     // Confirm that the token was signed with our signature.
  //     if (token) {
  //       const decoded = await this.authService.decodeJWT(token);
  //       const signatureFailed = !!decoded === false;

  //       if (signatureFailed) {
  //         return this.endRequest(403, 'Token signature expired.', res);
  //       }

  //       // See if the token was found
  //       const { username } = decoded;
  //       const tokens = await this.authService.getTokens(username);

  //       // if the token was found, just continue the request.
  //       if (tokens.length !== 0) {
  //         req.decoded = decoded;
  //         return next();
  //       } else {
  //         return next();
  //       }
  //     } else {
  //       return next();
  //     }
  //   };
  // }

  public ensureAuthenticated() {
    return async (req: any, res: any) => {
      const token = req.headers['authorization'];
      // Confirm that the token was signed with our signature.
      if (!token) {
        return this.endRequest(401, 'No id token provided', res);
      }
      const [type, tokenValue] = token.split(' ');
      // const decoded = await this.authService.decodeJWT(tokenValue);
      // const unverified = !!decoded === false;

      // if (unverified) {
      //   return this.endRequest(401, 'Unauthorized', res);
      // }

      // req.decoded = decoded;

      // Express needs next(), fastify does not
      // TODO abstract middleware like controller
      // return next();
    };
  }

  // public static createRateLimit(mins: number, maxRequests: number) {
  //   return rateLimit({
  //     windowMs: mins * 60 * 1000,
  //     max: maxRequests,
  //   });
  // }

  public static restrictedUrl(req: any, res: any, next: any) {
    // if (!isProduction) {
    //   return next();
    // }

    const approvedDomainList = ['https://khalilstemmler.com'];

    const domain = req.headers.origin;

    const isValidDomain = !!approvedDomainList.find((d) => d === domain);
    console.log(`Domain =${domain}, valid?=${isValidDomain}`);

    if (!isValidDomain) {
      return res.status(403).json({ message: 'Unauthorized' });
    } else {
      return next();
    }
  }
}
