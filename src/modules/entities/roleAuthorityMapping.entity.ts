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
import { Event } from './event.entity';
import { Consumer } from './consumer.entity';
import { Provider } from './provider.entity';
import { User } from './user.entity';
import { UserMappingLog } from './userMappingLog.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TvDevice } from './tvDevice.entity';
import { Authority } from './authority.entity';
import { Role } from './role.entity';

@Entity('role-authority-mapping', { schema: 'mycar' })
export class RoleAuthorityMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'role_id' })
  roleId: number;

  @ApiProperty()
  @Column({ name: 'authority_id' })
  authorityId: number;

  @ApiProperty()
  @Column('varchar', { name: 'mapping_status', default: 'ACTIVE', length: 255 })
  mappingStatus: string | null;

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

  @ManyToOne(() => Role, (role) => role.roleAuthorityMappings)
  @JoinColumn({ name: 'role_id' })
  public role: Role;

  @ManyToOne(() => Authority, (authority) => authority.roleAuthorityMappings)
  @JoinColumn({ name: 'authority_id' })
  public authority: Authority;
}
