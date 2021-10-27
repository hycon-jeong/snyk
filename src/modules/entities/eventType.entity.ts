import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('event_type', { schema: 'mycar' })
export class EventType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Db generic id' })
  id: number;

  @Column('varchar', { name: 'event_type_id', nullable: true, length: 255 })
  eventTypeId: string | null;

  @Column('varchar', { name: 'event_type', nullable: true, length: 255 })
  eventType: string | null;

  @Column('varchar', { name: 'event_content', nullable: true, length: 1024 })
  eventContent: string | null;

  @OneToMany(() => Event, (event) => event.eventType2)
  events: Event[];
}
