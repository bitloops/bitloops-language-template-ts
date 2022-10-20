import { Domain } from '@bitloops/bl-boilerplate-core';

export namespace DomainErrors {
  export class InvalidTitleError extends Domain.Error {
    constructor(title: string) {
      super(`Title ${title} is out of range`, 'INVALID_TITLE');
    }
  }
}
