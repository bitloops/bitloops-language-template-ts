import { Domain } from '@bitloops/bl-boilerplate-core';

export namespace DomainErrors {
  export class InvalidTitleError extends Domain.Error {
    constructor() {
      super(`Title length is out of bounds.`, 'INVALID_TITLE');
    }
  }
}
