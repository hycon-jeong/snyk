import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event, EventLog, User } from '.';
import { ApiProperty } from '@nestjs/swagger';
import { RoleAuthorityMapping } from './roleAuthorityMapping.entity';

@Entity('role', { schema: 'mycar' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'code', nullable: true })
  code: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', default: 'ACTIVE' })
  status: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @OneToMany(() => RoleAuthorityMapping, (map) => map.role)
  roleAuthorityMappings: RoleAuthorityMapping[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
