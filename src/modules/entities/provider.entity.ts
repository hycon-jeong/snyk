import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event, EventLog, User, UserLog } from '.';
import { Blocker } from './blocker.entity';
import { ProviderLog } from './providerLog.entity';
import { SystemLog } from './systemLog.entity';
import { UserAuthorityMapping } from './userAuthorityMapping.entity';
import { UserMapping } from './userMapping.entity';

@Entity('provider', { schema: 'mycar' })
export class Provider {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'provider_code', length: 255 })
  providerCode: string;

  @ApiProperty()
  @Column('varchar', { name: 'provider_name', length: 255 })
  providerName: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_server_ip',
    nullable: true,
    length: 255,
  })
  providerServerIp: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_server_port',
    nullable: true,
    length: 255,
  })
  providerServerPort: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_mac_address',
    nullable: true,
    length: 255,
  })
  providerMacAddress: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_background_url',
    length: 255,
  })
  providerBackgroundUrl: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_logo_url',
    length: 255,
  })
  providerLogoUrl: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'api_entry', nullable: true, length: 255 })
  apiEntry: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'auth', nullable: true, length: 255 })
  auth: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_os', nullable: true, length: 255 })
  providerOs: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_domain', nullable: true, length: 255 })
  providerDomain: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_server_type',
    nullable: true,
    comment: '온프레미스 \n클라우드\n AWS\n AZURE\n  etc',
    length: 255,
  })
  providerServerType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', length: 255, default: 'ACTIVE' })
  status: string;

  @OneToMany(() => ProviderLog, (providerLog) => providerLog.provider)
  providerLogs: ProviderLog[];

  @OneToMany(() => SystemLog, (systemLog) => systemLog.provider)
  systemLogs: SystemLog[];

  @OneToMany(() => UserMapping, (userMapping) => userMapping.provider)
  userMappings: UserMapping[];

  @OneToMany(() => Blocker, (blocker) => blocker.provider)
  blockers: Blocker[];

  @OneToMany(() => User, (user) => user.provider)
  users: User[];

  @OneToMany(
    () => UserAuthorityMapping,
    (userAuthorityMapping) => userAuthorityMapping.user,
  )
  userAuthorityMappings: UserAuthorityMapping[];

  @OneToMany(() => Event, (event) => event.provider)
  events: Event[];

  @OneToMany(() => EventLog, (eventLog) => eventLog.provider)
  eventLogs: EventLog[];
}
