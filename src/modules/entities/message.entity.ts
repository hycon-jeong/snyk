import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('message', { schema: 'mycar' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'message_id', length: 255 })
  messageId: string;

  @Column('varchar', { name: 'icon', nullable: true, length: 255 })
  icon: string | null;

  @Column('json', { name: 'message', nullable: true })
  message: object | null;

  @Column('datetime', { name: 'transmission_at', nullable: true })
  transmissionAt: Date | null;

  @Column('datetime', { name: 'reception_at', nullable: true })
  receptionAt: Date | null;

  @Column('tinyint', { name: 'transmission_flag', nullable: true, width: 1 })
  transmissionFlag: boolean | null;

  @OneToMany(() => Event, (event) => event.message)
  events: Event[];
}
