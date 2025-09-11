import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Page } from "src/common/page";
import { Inverter } from "../inverter.entity";

@ObjectType()
export class PageInverter extends Page(Inverter){}