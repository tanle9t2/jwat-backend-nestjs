import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Roles of the user',
});
@Entity({ schema: 'jwat', name: 'user' })
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'username' })
  username: string;

  @Field()
  @Column({ name: 'email' })
  email: string;

  @Field()
  @Column({ name: 'password' })
  password: string;

  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Field()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    name: 'role',
  })
  @Field(() => UserRole)
  role: UserRole;
}
