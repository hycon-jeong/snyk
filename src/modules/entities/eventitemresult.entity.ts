import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('eventitemresult', { schema: 'mycar' })
export class Eventitemresult {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'consumer_code', nullable: true, length: 45 })
  consumerCode: string | null;

  @Column('json', { name: 'reuslt', nullable: true })
  reuslt: object | null;

  @Column('int', { primary: true, name: 'event_id' })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.eventitemresults, {})
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
