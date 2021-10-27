import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consumer_event_type', { schema: 'mycar' })
export class ConsumerEventType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'consumer_code', length: 45 })
  consumerCode: string;

  @Column('int', { name: 'evnet_type_id' })
  evnetTypeId: number;
}
