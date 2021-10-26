import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsumerEntity } from './consumer.entity';

@Index('fk_consumer_log_consumer1_idx', ['consumerCode'], {})
@Entity('consumer_log', { schema: 'mycar' })
export class ConsumerLog {
  @PrimaryGeneratedColumn({ type: 'int', name: ' id' })
  id: number;

  @Column('varchar', { name: 'consumer_code', length: 45 })
  consumerCode: string;

  @Column('varchar', { name: 'status', nullable: true, length: 45 })
  status: string | null;

  @Column('datetime', {
    name: 'date_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAt: Date | null;

  @Column('varchar', { name: 'consumer_domain', nullable: true, length: 45 })
  consumerDomain: string | null;

  @Column('varchar', {
    name: 'consumer_mac_address',
    nullable: true,
    length: 45,
  })
  consumerMacAddress: string | null;

  @Column('varchar', {
    name: 'consumer_server_type',
    nullable: true,
    length: 45,
  })
  consumerServerType: string | null;

  @ManyToOne(() => ConsumerEntity, (consumer) => consumer.consumerLogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'id', referencedColumnName: 'id' }])
  consumerCode2: ConsumerEntity;
}
