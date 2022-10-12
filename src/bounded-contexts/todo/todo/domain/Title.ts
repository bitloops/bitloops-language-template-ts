// import { ValueObject } from '../../../../shared/domain/ValueObject';
// import { Result } from '../../../../shared/core/Result';
// import { Guard } from '../../../../shared/core/Guard';
import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from './DomainErrors';

interface TitleProps {
  title: string;
}

export class Title extends Domain.ValueObject<TitleProps> {
  get title(): string {
    return this.title;
  }

  private constructor(props: TitleProps) {
    super(props);
  }

  public static create(props: TitleProps): Either<Title, DomainErrors.InvalidTitleError> {
    if (props.title.length < 3 || props.title.length > 150) {
      return fail(new DomainErrors.InvalidTitleError());
    } else
      return ok(
        new Title({
          ...props,
        }),
      );
  }
}
