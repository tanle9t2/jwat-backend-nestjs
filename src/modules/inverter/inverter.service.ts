import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInverterInput } from './dto/create-inverter.input';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageInverter } from './dto/page-inverter.dto';
import {
  InverterListResponse,
  InverterResponse,
  InvertersRequest,
} from '../../grpc/generated/inverter';

import { dateToTimestamp } from '../../utils/helper';
import { Inverter } from './inverter.entity';

@Injectable()
export class InverterService {
  constructor(
    @InjectRepository(Inverter)
    private readonly inverterRepository: Repository<Inverter>,
  ) {}

  async findAll(agrs: InvertersRequest): Promise<InverterListResponse> {
    const query = this.inverterRepository.createQueryBuilder('inverter');
    const { page, size, sortBy, orderBy, inverterCode, inverterName, isFlag } =
      agrs;
    if (inverterCode) {
      query.andWhere('inverter.inverterCode = :inverterCode', { inverterCode });
    }

    if (inverterName) {
      query.andWhere('inverter.inverterName = :inverterName', { inverterName });
    }

    if (typeof isFlag === 'boolean') {
      query.andWhere('inverter.isFlag = :isFlag', { isFlag });
    }
    const offset = page * size;

    query.skip(offset).take(size);
    query.orderBy(
      `inverter.${sortBy}`,
      (orderBy?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC',
    );

    const [data, total] = await query.getManyAndCount();
    const pages = Math.ceil(total / size);
    const inverters: InverterResponse[] = data.map((inv) => ({
      ...inv,
      updatedAt: inv.updatedAt
        ? dateToTimestamp(new Date(inv.updatedAt))
        : undefined,
    }));

    return {
      inverters,
      totalElements: total,
      pages: pages,
      page: page,
      isLast: offset + data.length < total,
      size: size,
    };
  }

  async findById(id: number): Promise<Inverter | null> {
    return await this.inverterRepository.findOne({ where: { id } });
  }

  async save(inverter: CreateInverterInput): Promise<Inverter> {
    const entity = this.inverterRepository.create(inverter);
    entity.updatedAt = new Date();
    return await this.inverterRepository.save(entity);
  }

  async update(
    id: number,
    inverter: Partial<CreateInverterInput>,
  ): Promise<Inverter> {
    const entity = await this.inverterRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Inverter not found with id: ${id}`);
    }
    entity.updatedAt = new Date();
    Object.assign(entity, inverter);

    try {
      return await this.inverterRepository.save(inverter);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.inverterRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
