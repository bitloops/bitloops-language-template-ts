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
import { IQuery } from '../../domain/queries/IQuery';
import { IQueryBus, RegisterHandler } from '../../domain/queries/IQueryBus';
import { IMessage } from '../../domain/messages/IMessage';
import { IMessageBus } from '../../domain/messages/IMessageBus';

export class QueryBus implements IQueryBus {
  // private prefix: string = "query";
  private messageBus: IMessageBus;

  constructor(messageBus: IMessageBus) {
    this.messageBus = messageBus;
  }

  async register(queryTopic: string, registerHandler: RegisterHandler): Promise<void> {
    const subscriberHandlers = this.messageBus.getSubscriberHandlers(queryTopic);
    if (
      subscriberHandlers === undefined ||
      subscriberHandlers === null ||
      subscriberHandlers.length === 0
    ) {
      //   console.log('going to subscribe');
      await this.messageBus.subscribe(queryTopic, registerHandler);
    }
  }

  async query(query: IQuery): Promise<IMessage> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (!query?.metadata?.responseTopic) {
        return reject('No response topic');
      }
      console.log('sendAndGetResponse: query.metadata.responseTopic', query.metadata.responseTopic);
      await this.messageBus.subscribe(query.metadata.responseTopic, (message: IMessage) => {
        console.log('sendAndGetResponse: message', message);
        //TODO unsubscribe
        return resolve(message);
      });
      console.log('sendAndGetResponse: befre publishing query');
      await this.messageBus.publish(query.queryTopic, query);
    });
  }

  async unregister(queryTopic: string): Promise<void> {
    const subscriberHandlers = this.messageBus.getSubscriberHandlers(queryTopic);
    console.log({ subscriberHandlers });
    if (subscriberHandlers) {
      const [subscriberHandler] = subscriberHandlers;
      await this.messageBus.unsubscribe(queryTopic, subscriberHandler);
    }
  }
}
