import { Domain } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './DomainErrors';

export class InvalidTitleError implements Domain.IRule {
  constructor(private title: string) {}

  public Error = new DomainErrors.InvalidTitleError(this.title);

  public isBrokenIf(): boolean {
    return this.title.length < 4 || this.title.length > 150;
  }
}
