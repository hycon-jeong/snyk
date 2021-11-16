import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '.';
import { ProviderLog } from './providerLog.entity';
import { UserMapping } from './userMapping.entity';

@Entity('provider', { schema: 'mycar' })
export class Provider {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'provider_code', length: 255 })
  providerCode: string;

  @ApiProperty()
  @Column('varchar', { name: 'provider_name', nullable: true, length: 255 })
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
    nullable: true,
    length: 255,
  })
  providerBackgroundUrl: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_logo_url',
    nullable: true,
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

  @OneToMany(() => ProviderLog, (providerLog) => providerLog.provider)
  providerLogs: ProviderLog[];

  @OneToMany(() => UserMapping, (userMapping) => userMapping.provider)
  userMappings: UserMapping[];

  @OneToMany(() => Event, (event) => event.provider)
  events: Event[];
}
