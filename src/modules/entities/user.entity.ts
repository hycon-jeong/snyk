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
import { UserMapping } from './userMapping.entity';
import { UserLog } from './userLog.entity';
import { PasswordTransformer } from './password.transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'modules/common/constants/roles';
import { UserAuthorityMapping } from './userAuthorityMapping.entity';
import { SystemLog } from './systemLog.entity';
import { Provider } from '.';

@Entity('users', { schema: 'mycar' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('varchar', { name: 'user_key', length: 255, nullable: true })
  userKey: string;

  @Column('int', { name: 'provider_id', nullable: true })
  providerId: number;

  @ApiProperty()
  @Column({ name: 'email', nullable: true })
  @Index({ unique: true, where: 'email IS NOT NULL' })
  email: string;

  @ApiProperty()
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @ApiProperty()
  @Column({
    type: 'enum',
    name: 'role',
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @ManyToOne(() => Provider, (provider) => provider.user)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;

  @OneToMany(() => UserMapping, (userMapping) => userMapping.user)
  userMappings: UserMapping[];

  @OneToMany(
    () => UserAuthorityMapping,
    (userAuthorityMapping) => userAuthorityMapping.user,
  )
  userAuthorityMappings: UserAuthorityMapping[];

  @OneToMany(() => UserLog, (userLog) => userLog.user)
  userLogs: UserLog[];

  @OneToMany(() => SystemLog, (systemLog) => systemLog.user)
  systemLogs: SystemLog[];

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  toJSON() {
    const { password, ...self } = this;
    return self;
  }
}
