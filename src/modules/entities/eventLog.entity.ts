import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '.';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('event_log', { schema: 'mycar' })
export class EventLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 45 })
  status: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'date_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  dateAt: Date | null;
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'event_id', nullable: true })
  eventId: number;

  @ApiProperty()
  @Column({ name: 'action_message', nullable: true, length: 255 })
  actionMessage: string | null;

  @ApiProperty()
  @Column({ name: 'action_data', nullable: true, length: 2000 })
  actionData: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'transmission_at', nullable: true })
  transmissionAt: Date | null;

  @ApiProperty()
  @Column('datetime', { name: 'reception_at', nullable: true })
  receptionAt: Date | null;

  @ManyToOne(() => Event, (event) => event.eventLogs, {})
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
