import { InProcessMessageBus } from '../../shared/infra/messageBus/InProcessMessageBus';
import {
  ExternalMessageBusFactory,
  ExternalMessageBusProviders,
} from '../../shared/infra/messageBus/ExternalMessageBusFactory';
import { Command } from '../../shared/domain/commands/Command';
import { IMessage } from '../../shared/domain/messages/IMessage';
import { EventBus } from '../../shared/infra/event-bus';
import { CommandBus } from '../../shared/infra/command-bus';
import { ICommandBus, RegisterHandler } from '../../shared/domain/commands/ICommandBus';
import { config } from '../../config/';

type CommandData = { data: string };
const SPECIFIC_COMMAND_NAME = 'SPECIFIC_COMMAND_NAME';

const { TOPIC_DELIMITER } = config;

class SpecificCommand extends Command {
  public data: string;
  // private metadata: Record<string, any>;
  // Set static name so we can refer to them easily
  public static commandName = SPECIFIC_COMMAND_NAME;

  constructor(commandData: CommandData, uuid?: string) {
    super(SpecificCommand.commandName, uuid);
    const { data } = commandData;
    this.data = data;
  }
}

const CREATE_USER_COMMAND_NAME = 'CREATE_USER_COMMAND_NAME';
const TO_CONTEXT_ID = 'myContext';

export class CreateUserCommand extends Command {
  private _username: string;
  private _email: string;
  private _password: string;
  // Set static name so we can refer to them easily
  public static readonly commandName = CREATE_USER_COMMAND_NAME;
  public static readonly toContextId = TO_CONTEXT_ID;

  constructor(userData: any, uuid?: string) {
    super(CreateUserCommand.commandName, CreateUserCommand.toContextId, uuid);
    const { username, email, password } = userData;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}

// IMessage: InterProcess / External
// Event: (Domain - Internal) / Integration (Internal/ External)

// interface IQuery extends IMessage {
//   createdTimestamp: UnixTimestamp;
// }

// Event bus realisation

const smsHandler = (message: IMessage) => {
  console.log('SMS event received', message);
};

const emailHandler = (message) => {
  console.log('Email event received', message);
};

// const messageBus =  externalMessageBusFactory(ExternalMessageBusProviders.NATS);

// console.log('messageBus2', messageBus2);

// in every context
const contextConfig1 = {
  CONTEXT_ID: 'myContext',
};

enum ContextTypes {
  InProcess = 'InProcess',
  External = 'External',
}

// belongs to general index
const contextLocalityMappings = {
  [contextConfig1.CONTEXT_ID]: ContextTypes.InProcess,
};

const main = async () => {
  const TOPIC = 'test_topic';
  // const messageBus = new ExternalMessageBus();
  // const externalMessageBus = ExternalMessageBusFactory(
  //   ExternalMessageBusProviders.NATS
  // );
  // console.log("before connect");
  // await externalMessageBus.connect();
  // console.log("after connect");

  // const inProcessMessageBus = new InProcessMessageBus();

  // await externalMessageBus.subscribe(TOPIC, smsHandler);
  // await externalMessageBus.subscribe(TOPIC, emailHandler);

  // await externalMessageBus.publish(TOPIC, "name");

  // await externalMessageBus.publish(TOPIC, "name 2");

  // console.log("after nats");

  // // Create event bus instance
  // const inProcessMessageBus = new InProcessMessageBus();

  // // Subscribe services to event bus
  // //   messageBus.subscribe("notification", smsService);
  // //   messageBus.subscribe("notification", emailService);

  // await inProcessMessageBus.subscribe("notification", smsHandler);
  // await inProcessMessageBus.subscribe("notification", emailHandler);

  // console.log(
  //   "messageBus.subscribers before",
  //   inProcessMessageBus.getSubscriberHandlers("notification")
  // );

  // Publish event
  // await inProcessMessageBus.publish("notification", "name");

  // Unsubscribe serivece
  // await inProcessMessageBus.unsubscribe("notification", smsHandler);

  // console.log(
  //   "messageBus.subscribers after",
  //   inProcessMessageBus.getSubscriberHandlers("notification")
  // );

  // // Run one more time
  // await inProcessMessageBus.publish("notification", "name 2");

  // External command bus
  // const specificHandler = (command: SpecificCommand) => {
  //   console.log("Specific event received", command);
  //   console.log('before publish: command.metadata.responseTopic', command.metadata.responseTopic)
  //   externalMessageBus.publish(command.metadata.responseTopic, 'everything ok');
  // };
  // const externalCommandBus = new CommandBus(externalMessageBus);

  // const spExternalCommand = new SpecificCommand({ data: "malakas" });
  // console.log(spExternalCommand);
  // await externalCommandBus.register(spExternalCommand.commandName, specificHandler);
  // const reply = await externalCommandBus.sendAndGetResponse(spExternalCommand);
  // console.log('data received!!', reply)
  // await externalCommandBus.unregister(spExternalCommand.commandName);

  // Internal command bus

  // const eventBus = new EventBus(inProcessMessageBus)
  // const specificHandler: RegisterHandler = async (command: SpecificCommand) => {
  //   console.log("Specific event received", command);
  //   console.log('before publish: command.metadata.responseTopic', command.metadata.responseTopic)
  //   await eventBus.publish(command.metadata.responseTopic, 'everything ok');
  //   // return 'ok'
  // };
  // const internalCommandBus = new CommandBus(inProcessMessageBus);
  // const spInternalCommand = new SpecificCommand({ data: "malakas" });
  // console.log(spInternalCommand);
  // await internalCommandBus.register(spInternalCommand.commandName, specificHandler);
  // const data = await internalCommandBus.sendAndGetResponse(spInternalCommand);
  // console.log('data received!!', data)
  // await internalCommandBus.unregister(spInternalCommand.commandName);
  // await internalCommandBus.send(spInternalCommand);

  // Internal event bus

  // const eventTopic = 'test_topic';
  // const internalEventBus = new EventBus(inProcessMessageBus);
  // const message = "something";
  // await internalEventBus.subscribe(eventTopic, smsHandler);
  // await internalEventBus.subscribe(eventTopic, emailHandler);
  // await internalEventBus.publish(eventTopic, message);

  // await internalEventBus.unsubscribe(eventTopic, smsHandler);
  // await internalEventBus.publish(eventTopic, message);

  // External event bus

  // const eventTopic = 'test_topic';
  // const externalEventBus = new EventBus(externalMessageBus);
  // const message = "something";
  // await externalEventBus.subscribe(eventTopic, smsHandler);
  // await externalEventBus.subscribe(eventTopic, emailHandler);
  // await externalEventBus.publish(eventTopic, message);

  // await externalEventBus.unsubscribe(eventTopic, smsHandler);
  // await externalEventBus.publish(eventTopic, message);

  // const messageBus = new MessageBus(inProcessMessageBus)

  const externalMessageBus = await ExternalMessageBusFactory(ExternalMessageBusProviders.NATS);

  const inProcessMessageBus = new InProcessMessageBus();

  const internalCommandBus = new CommandBus(inProcessMessageBus);
  const externalCommandBus = new CommandBus(externalMessageBus);

  const specificHandler: RegisterHandler = async (command: CreateUserCommand) => {
    console.log('Specific event received', command);
    console.log('before publish: command.metadata.responseTopic', command.metadata.responseTopic);
    const messageBus = getMessageBus(inProcessMessageBus, externalMessageBus, command.metadata);
    await messageBus.publish(command.metadata.responseTopic, 'everything ok');
    // return 'ok'
  };

  const command = new CreateUserCommand({ username: 'malakas', email: 'malak' });
  console.log('command', command);

  const commandBus = getCommandBus(internalCommandBus, externalCommandBus, command.metadata);

  // let commandBus;
  // if (!contextLocalityMappings[command.metadata.toContextId]) {
  //   throw new Error(`Context id: ${command.metadata.toContextId} is missing from mappings`)
  // }
  // if (contextLocalityMappings[command.metadata.toContextId] === ContextTypes.InProcess){
  //   commandBus = internalCommandBus;
  // }  else if (contextLocalityMappings[command.metadata.toContextId] === ContextTypes.External) {
  //   commandBus = externalCommandBus;
  // }

  await commandBus.register(command.commandName, specificHandler);
  const reply = await commandBus.sendAndGetResponse(command);
  console.log('data received!!', reply);
  await commandBus.unregister(command.commandName);
};

const getCommandBus = (
  internalCommandBus: ICommandBus,
  externalCommandBus: ICommandBus,
  metadata: any,
): ICommandBus => {
  let commandBus;
  if (!contextLocalityMappings[metadata.toContextId]) {
    throw new Error(`Context id: ${metadata.toContextId} is missing from mappings`);
  }
  if (contextLocalityMappings[metadata.toContextId] === ContextTypes.InProcess) {
    commandBus = internalCommandBus;
  } else if (contextLocalityMappings[metadata.toContextId] === ContextTypes.External) {
    commandBus = externalCommandBus;
  }

  return commandBus;
};

const getMessageBus = (inProcessMessageBus, externalMessageBus, metadata): any => {
  let messageBus;
  if (!contextLocalityMappings[metadata.toContextId]) {
    throw new Error(`Context id: ${metadata.toContextId} is missing from mappings`);
  }
  if (contextLocalityMappings[metadata.toContextId] === ContextTypes.InProcess) {
    messageBus = inProcessMessageBus;
  } else if (contextLocalityMappings[metadata.toContextId] === ContextTypes.External) {
    messageBus = externalMessageBus;
  }

  return messageBus;
};

main();
