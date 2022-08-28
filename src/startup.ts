// import Container from './container';

(async () => {
  // Needs to be done first
  // await Container.initializeServices();
  await import('./shared/infra/rest/fastify/app'); // @TEMPLATE
  // await import('./shared/infra/rest/express/app');
  // await import('./shared/infra/grpc/app'); // @TEMPLATE
  // await import('./shared/infra/graphql/app'); // @TEMPLATE
})();
