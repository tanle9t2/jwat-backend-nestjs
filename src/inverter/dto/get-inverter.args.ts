import {  ArgsType, Field, IntersectionType } from "@nestjs/graphql";
import { PaginationArgs } from "src/common/agrs/pagination.args";
import { SortArgs } from "src/common/agrs/sort.args";

@ArgsType()
export class GetInverterAgrs extends IntersectionType(PaginationArgs, SortArgs){
    @Field({nullable:true})
    inverterCode?:string

    @Field({nullable:true})
    inverterName?:string

    @Field({nullable:true})
    isFlag?:boolean
}