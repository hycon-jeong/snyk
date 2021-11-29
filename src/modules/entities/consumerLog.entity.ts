import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consumer } from './consumer.entity';

@Entity('consumer_log', { schema: 'mycar' })
export class ConsumerLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_code', length: 255 })
  consumerCode: string;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @ApiProperty()
  @Column('datetime', {
    name: 'date_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAt: Date | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_domain', nullable: true, length: 255 })
  consumerDomain: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_mac_address',
    nullable: true,
    length: 255,
  })
  consumerMacAddress: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'consumer_server_type',
    nullable: true,
    length: 255,
  })
  consumerServerType: string | null;

  @ManyToOne(() => Consumer, (consumer) => consumer.consumerLogs)
  @JoinColumn({ name: 'consumer_id' })
  public consumer: Consumer;
  @ApiProperty()
  @Column({ name: 'consumer_id' })
  consumerId: number;
}
