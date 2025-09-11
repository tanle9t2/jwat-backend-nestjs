import { Field, Int, ObjectType } from "@nestjs/graphql";

export function Page<T>(classRef: new () => T) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    data: T[];

    @Field(() => Int)
    totalElements: number;

    @Field(() => Int)
    pages: number;

    @Field(() => Int)
    size: number;

    @Field()
    isLast: boolean;
  }
  return PaginatedType;
}
