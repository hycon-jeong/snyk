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
import { EventLog, Provider } from '.';
import { Role } from './role.entity';
import { KeyStores } from './keyStores.entity';

@Entity('users', { schema: 'mycar' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'role_id', nullable: true })
  roleId: number;

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

  // @ApiProperty()
  // @Column({
  //   type: 'enum',
  //   name: 'role',
  //   enum: Roles,
  //   default: Roles.USER,
  // })
  // role: Roles;

  @ApiProperty()
  @Column('varchar', { name: 'status', length: 255, default: 'ACTIVE' })
  status: string;

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

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Provider, (provider) => provider.users)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

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

  @OneToMany(() => EventLog, (eventLog) => eventLog.user)
  eventLogs: EventLog[];

  @OneToMany(() => KeyStores, (keyStores) => keyStores.user)
  keyStores: KeyStores[];

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
