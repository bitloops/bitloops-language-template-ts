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
import {
  connect,
  ConnectionOptions,
  JSONCodec,
  NatsConnection,
  StringCodec,
  SubscriptionOptions,
  Msg,
  NatsError,
} from 'nats';
import { IMQ } from '../../IMQ';
import { natsConfig, TIMEOUT } from './config';

class NATS implements IMQ<NatsConnection> {
  private options: ConnectionOptions;
  private natsConnection: NatsConnection;

  constructor(options: ConnectionOptions = natsConfig) {
    this.options = options;
  }

  async initializeConnection(): Promise<NatsConnection> {
    this.natsConnection = await connect(this.options);
    return this.natsConnection;
  }

  async getConnection(): Promise<NatsConnection> {
    if (!this.natsConnection) {
      await this.initializeConnection();
    }
    return this.natsConnection;
  }

  async closeConnection(): Promise<void> {
    return await this.natsConnection.close();
  }

  async gracefullyCloseConnection(): Promise<void> {
    if (this.natsConnection) {
      await this.natsConnection.drain();
      this.natsConnection = null;
    }
  }

  async publish(topic: string, message: Record<string, unknown> | string): Promise<void> {
    if (!this.natsConnection) throw new Error('Nats connection not established');
    if (typeof message !== 'string' && typeof message !== 'object') {
      throw new Error('Message must be either string or object');
    }

    let encodedMsg;
    if (typeof message === 'string') {
      encodedMsg = StringCodec().encode(message);
    } else if (typeof message === 'object') {
      encodedMsg = JSONCodec().encode(message);
    }
    this.natsConnection.publish(topic, encodedMsg);
  }

  async request<Response>(topic: string, payload: any, options?: any): Promise<Response> {
    const encodedPayload = JSONCodec().encode(payload);
    const responseMessage = await this.natsConnection.request(topic, encodedPayload, {
      timeout: options.timeout ?? TIMEOUT,
    });
    const encodedResponseData = responseMessage.data;
    return JSONCodec<Response>().decode(encodedResponseData);
  }

  async subscribe(
    topic: string,
    topicHandler: (data, subject: string) => void,
    subscriptionGroup: string,
  ) {
    const subscriptionParams: SubscriptionOptions = {
      callback: function (err: NatsError | null, msg: Msg) {
        if (err) {
          console.error('NatsError', err);
          return;
        }
        const jc = JSONCodec();
        const message = jc.decode(msg.data);
        if (msg.reply) {
          message['originalReply'] = msg.reply;
        }
        topicHandler(message, msg.subject);
      },
    };
    if (subscriptionGroup) {
      subscriptionParams.queue = subscriptionGroup;
    }
    this.natsConnection.subscribe(topic, subscriptionParams);
  }
}

export default NATS;
