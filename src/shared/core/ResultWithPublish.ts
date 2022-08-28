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
import Container from '../../container';
import { CommandMetadata } from '../domain/commands/ICommand';
import { QueryMetadata } from '../domain/queries/IQuery';
import { Right, Left, Either } from './Result';

type Metadata = CommandMetadata | QueryMetadata;

export const left = (metadata?: Metadata) => {
  return async <L, A>(l: L): Promise<Either<L, A>> => {
    const res: Either<L, A> = new Left(l);
    if (metadata) await replyToResponseTopic(metadata, res);
    return res;
  };
};

export const right = (metadata?: Metadata) => {
  return async <L, A>(a?: A): Promise<Either<L, A>> => {
    const res: Either<L, A> = new Right<L, A>(a);
    if (metadata) await replyToResponseTopic(metadata, res);
    return res;
  };
};

const replyToResponseTopic = async <L, A>(metadata: Metadata, res: Either<L, A>) => {
  // TODO check instanceof messageBus and in case of external, change response
  const messageBus = Container.getMessageBusFromContext(metadata.toContextId);
  if (metadata.responseTopic) await messageBus.publish(metadata.responseTopic, res);
};
