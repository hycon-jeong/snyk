import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  @Column('varchar', { name: 'event_type', nullable: true, length: 255 })
  eventType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'event_content', nullable: true, length: 1024 })
  eventContent: string | null;

  @OneToMany(() => Event, (event) => event.eventType, {})
  events: Event[];
}
