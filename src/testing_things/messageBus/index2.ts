// import { mainModule } from "process";
import { Query } from '../../shared/domain/queries/Query';
import {
  ExternalMessageBusFactory,
  ExternalMessageBusProviders,
} from '../../shared/infra/messageBus/ExternalMessageBusFactory';
import { InProcessMessageBus } from '../../shared/infra/messageBus/InProcessMessageBus';
import { QueryBus } from '../../shared/infra/query-bus';

const SPECIFIC_QUERY_NAME = 'SPECIFIC_QUERY_NAME';
type QueryData = { data: string };

class SpecificQuery extends Query {
  public data: string;
  // private metadata: Record<string, any>;
  // Set static name so we can refer to them easily
  public static queryName = SPECIFIC_QUERY_NAME;

  constructor(queryData: QueryData, uuid?: string) {
    super(uuid, SpecificQuery.queryName);
    const { data } = queryData;
    this.data = data;
  }
}

const main = async () => {
  const externalMessageBus = await ExternalMessageBusFactory(ExternalMessageBusProviders.NATS);
  // console.log("before connect");
  // await externalMessageBus.connect();
  // console.log("after connect");

  const inProcessMessageBus = new InProcessMessageBus();

  // External command bus
  const specificHandler = (query: SpecificQuery) => {
    console.log('Specific query event received', query);
    console.log('before publish: query.metadata.responseTopic', query.metadata.responseTopic);
    externalMessageBus.publish(query.metadata.responseTopic, 'everything ok');
  };

  const externalQueryBus = new QueryBus(externalMessageBus);

  const spExternalQuery = new SpecificQuery({ data: 'malakas' });
  console.log('spExternalQuery', spExternalQuery);
  await externalQueryBus.register(spExternalQuery.queryName, specificHandler);
  const reply = await externalQueryBus.query(spExternalQuery);
  console.log('data received!!', reply);
  await externalQueryBus.unregister(spExternalQuery.queryName);

  //   Internal command bus

  // const specificHandler = (query: SpecificQuery) => {
  //   console.log("Specific query received", query);
  //   console.log('before publish: command.metadata.responseTopic', query.metadata.responseTopic)
  //   inProcessMessageBus.publish(query.metadata.responseTopic, 'everything ok');
  // };
  // const internalQueryBus = new QueryBus(inProcessMessageBus);
  // const spInternalQuery= new SpecificQuery({ data: "malakas" });
  // // console.log(spInternalCommand);
  // await internalQueryBus.register(spInternalQuery.queryName, specificHandler);
  // const data = await internalQueryBus.query(spInternalQuery);
  // console.log('data received!!', data)
  // await internalQueryBus.unregister(spInternalQuery.queryName);
  // // await internalQueryBus.sendAndGetResponse(spInternalQuery);
};

main();
