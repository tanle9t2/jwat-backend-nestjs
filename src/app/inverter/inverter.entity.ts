import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ schema: 'jwat', name: 'inverter' })
export class Inverter {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'inverter_code' })
  inverterCode: string;

  @Field()
  @Column({ name: 'inverter_name' })
  inverterName: string;

  @Field()
  @Column({ name: 'slave_address' })
  slaveAddress: string;

  @Field()
  @Column({ name: 'start_address' })
  startAddress: string;

  @Field()
  @Column({ name: 'number_of_poles' })
  numberOfPoles: number;

  @Field(() => Date)
  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Field()
  @Column({ name: 'is_flag' })
  isFlag: boolean;
}
