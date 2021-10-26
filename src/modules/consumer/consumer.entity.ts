import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConsumerLog } from './consumerLog.entity';

@Entity('consumer', { schema: 'mycar' })
export class ConsumerEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true, name: 'consumer_code', length: 45 })
  consumerCode: string;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_type', nullable: true, length: 45 })
  consumerType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_name', nullable: true, length: 45 })
  consumerName: string | null;

  @ApiProperty()
  @Column('int', { name: 'consumer_server_ip' })
  consumerServerIp: number;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_server_port',
    nullable: true,
    length: 45,
  })
  consumerServerPort: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_mac_address',
    nullable: true,
    length: 45,
  })
  consumerMacAddress: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'api_entry', nullable: true, length: 45 })
  apiEntry: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'auth', nullable: true, length: 45 })
  auth: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_os', nullable: true, length: 45 })
  consumerOs: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_domain', nullable: true, length: 45 })
  consumerDomain: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_server_type',
    nullable: true,
    comment: '온프레미스 \n클라우드\n AWS\n AZURE \n  etc',
    length: 45,
  })
  consumerServerType: string | null;

  @ApiProperty()
  @OneToMany(() => ConsumerLog, (consumerLog) => consumerLog.consumerCode2)
  consumerLogs: ConsumerLog[];
}
