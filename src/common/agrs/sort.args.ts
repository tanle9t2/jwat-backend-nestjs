import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SortArgs {
  @Field({ defaultValue: 'id', nullable: true })
  sortBy?: string = 'id';

  @Field({ defaultValue: 'desc', nullable: true })
  orderBy?: string = 'desc';
}
