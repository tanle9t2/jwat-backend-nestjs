import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inverter } from './inverter.entity';
import { InverterService } from './inverter.service';
import { GetInverterAgrs } from './dto/get-inverter.args';
import { PageInverter } from './dto/page-inverter.dto';
import { CreateInverterInput } from './dto/create-inverter.input';

@Resolver(() => Inverter)
export class InverterResolver {
  constructor(private readonly inverterService: InverterService) {}

  @Query((returns) => PageInverter)
  getInverts(@Args() agrs: GetInverterAgrs) {
    return this.inverterService.findAll(agrs);
  }

  @Query((returns) => Inverter)
  getInvert(@Args('id', { type: () => Int }) id: number) {
    return this.inverterService.findById(id);
  }

  @Mutation((returns) => Inverter)
  createInverter(
    @Args('createInverterInput') createInvertInput: CreateInverterInput,
  ) {
    return this.inverterService.save(createInvertInput);
  }

  @Mutation((returns) => Inverter)
  updateInverter(
    @Args('id', { type: () => Int }) id: number,
    @Args('createInverterInput') createInvertInput: CreateInverterInput,
  ) {
    return this.inverterService.update(id, createInvertInput);
  }
}
