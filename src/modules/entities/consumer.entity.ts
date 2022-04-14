import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsumerLog } from './consumerLog.entity';
import { SystemLog } from './systemLog.entity';
import { UserMapping } from './userMapping.entity';

@Entity('consumer', { schema: 'mycar' })
export class Consumer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Db generic id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_code', unique: true, length: 255 })
  consumerCode: string;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_type', nullable: true, length: 255 })
  consumerType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_name', length: 255 })
  consumerName: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_server_ip',
    nullable: true,
    length: 255,
  })
  consumerServerIp: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_server_port',
    nullable: true,
    length: 255,
  })
  consumerServerPort: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_mac_address',
    nullable: true,
    length: 255,
  })
  consumerMacAddress: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'api_entry', nullable: true, length: 255 })
  apiEntry: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'auth', nullable: true, length: 255 })
  auth: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_os', nullable: true, length: 255 })
  consumerOs: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_domain', nullable: true, length: 255 })
  consumerDomain: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_image_url',
    length: 255,
  })
  consumerImageUrl: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_server_type',
    nullable: true,
    comment: '온프레미스 \n클라우드\n AWS\n AZURE \n  etc',
    length: 255,
  })
  consumerServerType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', length: 255 })
  status: string | null;

  @OneToMany(() => ConsumerLog, (consumerLog) => consumerLog.consumer)
  consumerLogs: ConsumerLog[];

  @OneToMany(() => SystemLog, (systemLog) => systemLog.consumer)
  systemLogs: SystemLog[];

  @OneToMany(() => UserMapping, (userMapping) => userMapping.consumer)
  userMappings: UserMapping[];
}
