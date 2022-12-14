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
import uuid from 'uuid/v4';
import { QueryMetadata, IQuery } from './IQuery';
import { config } from '../../../config';
import { getTopic } from '../../helpers';

const { TOPIC_DELIMITER, TOPIC_PREFIXES } = config;

export abstract class Query implements IQuery {
  private static prefix: string = TOPIC_PREFIXES.Query;

  public readonly uuid: string;
  private createdTimestamp: number;
  public readonly metadata: QueryMetadata;
  public readonly queryTopic: string;
  public readonly toContextId: string;

  constructor(queryName: string, toContextId: string, orchestrated?: boolean) {
    this.uuid = uuid();
    this.createdTimestamp = Date.now();
    this.queryTopic = Query.getQueryTopic(queryName, toContextId);
    this.toContextId = toContextId;
    this.metadata = {
      responseTopic: `${queryName}${TOPIC_DELIMITER}${this.uuid}`,
      toContextId,
      orchestrated: orchestrated ?? false,
    };
  }

  static getQueryTopic(queryName: string, toContextId: string): string {
    return getTopic({
      topicPrefix: Query.prefix,
      name: queryName,
      contextId: toContextId,
      topicDelimiter: TOPIC_DELIMITER,
    });
  }
}
