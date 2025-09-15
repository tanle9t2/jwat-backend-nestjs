import { Paginated } from 'src/common/paginated';
import { Inverter } from '../inverter.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginateInverter extends Paginated(Inverter) {}
