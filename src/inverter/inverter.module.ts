import { Module } from "@nestjs/common";
import { InverterResolver } from "./inverter.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inverter } from "./inverter.entity";
import { InverterService } from "./inverter.service";

@Module({
    imports:[  TypeOrmModule.forFeature([Inverter])],
    providers:[InverterResolver,InverterService]
})

export class InverterModule{}