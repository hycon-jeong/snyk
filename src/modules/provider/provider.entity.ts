import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProviderLogEntity } from './providerLog.entity';

@Entity('provider', { schema: 'mycar' })
export class ProviderEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, name: 'provider_code', length: 45 })
  providerCode: string;

  @ApiProperty()
  @Column('varchar', { name: 'provider_name', nullable: true, length: 45 })
  providerName: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_server_ip', nullable: true, length: 45 })
  providerServerIp: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_server_port',
    nullable: true,
    length: 45,
  })
  providerServerPort: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_mac_address',
    nullable: true,
    length: 45,
  })
  providerMacAddress: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'api_entry', nullable: true, length: 45 })
  apiEntry: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'auth', nullable: true, length: 45 })
  auth: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_os', nullable: true, length: 45 })
  providerOs: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_domain', nullable: true, length: 45 })
  providerDomain: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'provider_server_type',
    nullable: true,
    comment: '온프레미스 \n클라우드\n AWS\n AZURE\n  etc',
    length: 45,
  })
  providerServerType: string | null;

  @OneToMany(
    () => ProviderLogEntity,
    (providerLog) => providerLog.providerCode2,
  )
  providerLogs: ProviderLogEntity[];
}
