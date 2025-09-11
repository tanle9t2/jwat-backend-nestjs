import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateInverterInput } from "./dto/create-inverter.input";
import { Inverter } from "./inverter.entity";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paginated } from "src/common/paginated";
import { ObjectType } from "@nestjs/graphql";
import {  PageInverter } from "./dto/page-inverter.dto";



@Injectable()
export class InverterService{
    constructor(
        @InjectRepository(Inverter)
        private readonly inverterRepository:Repository<Inverter>
    ) {}

  async findAll(agrs): Promise<PageInverter> {
    const query = this.inverterRepository.createQueryBuilder('inverter');
    const {page,size,sortBy,orderBy,inverterCode,inverterName,isFlag} = agrs;
    if (inverterCode) {
        query.andWhere('inverter.inverterCode :=inverterCode', {inverterCode})
    }
    if (inverterName) {
        query.andWhere('inverter.inverterName :=inverterCode', {inverterCode})
    } 
    if (isFlag) {
        query.andWhere('inverter.isFlag :=isFlag', {isFlag})
    }
    const offset = page*size
    
    query.skip(offset).take(size)
    query.orderBy(`inverter.${sortBy}`, (orderBy?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC');

    const [data, total] = await query.getManyAndCount();
    const pages = Math.ceil(total/size);
  
    const result = new PageInverter()
    result.data=  data;
    result.totalElements = total
    result.size = data.length
    result.isLast = offset + data.length < total
    result.pages = pages

    return result;
  }

  async findById(id:number): Promise<Inverter | null> {
    return this.inverterRepository.findOne({ where: { id } });
  }

  async save(inverter: CreateInverterInput) : Promise<Inverter> {
    const entity = this.inverterRepository.create(inverter);
    return entity;
  }

   async update(id: number, inverter: Partial<CreateInverterInput>): Promise<Inverter> {
    const entity  =this.inverterRepository.findOne({where:{id}})
    if(!inverter) {
        throw new NotFoundException(`Inverter not found with id: ${id}`)
    }
    Object.assign(entity, inverter )
    
    try {
        return await this.inverterRepository.save(inverter)
    }catch(error) {
        throw new InternalServerErrorException(error.message)
    }
  
  }
  
  async delete(id:number):Promise<boolean> {
    const result = await this.inverterRepository.delete(id)
     return (result.affected ?? 0) > 0;
  }
    
}