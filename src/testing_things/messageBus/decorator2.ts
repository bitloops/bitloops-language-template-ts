import { IEvent } from '../../shared/domain/events/IEvent';
import { EventBus } from '../../shared/infra/event-bus';
import { InProcessMessageBus } from '../../shared/infra/messageBus/InProcessMessageBus';
import {
  ExternalMessageBusFactory,
  ExternalMessageBusProviders,
} from '../../shared/infra/messageBus/ExternalMessageBusFactory';
import { ExternalEventBusDecorator } from '../../shared/infra/event-bus/eventBusDecorator';

const main = async () => {
  const mesageBus = new InProcessMessageBus();
  const inProcessEventBus = new EventBus(mesageBus);

  const externalMessageBus = await ExternalMessageBusFactory(ExternalMessageBusProviders.NATS);

  const externalEventBus = new EventBus(externalMessageBus);

  const eventBusWithExternalEventBus = new ExternalEventBusDecorator(
    inProcessEventBus,
    externalEventBus,
  );

  await inProcessEventBus.subscribe('test', (message: IEvent) => {
    console.log('inProcessEventBus got event:', message);
  });
  // await eventBusWithExternalEventBus.subscribe("test", (message: IEvent) => {console.log('got event:', message)});
  await externalEventBus.subscribe('test', (message: IEvent) => {
    console.log('externalEventBus got event:', message);
  });

  await eventBusWithExternalEventBus.publish('test', {
    hahah: 'test',
  });

  // const externalMessageBus = ExternalMessageBusFactory(ExternalMessageBusProviders.NATS);
};

main();
