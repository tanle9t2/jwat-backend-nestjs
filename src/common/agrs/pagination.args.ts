
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 ,nullable:true})
  page?: number = 0;

  @Field(() => Int, { defaultValue: 10 ,nullable:true})
  size?: number = 10;
}
