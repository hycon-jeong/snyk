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
import { Category, Consumer, Provider, User } from '.';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('event_log', { schema: 'mycar' })
export class EventLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

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

  @Column({ name: 'provider_id', nullable: true })
  providerId: number;

  @Column({ name: 'consumer_id', nullable: true })
  consumerId: number;

  @ApiProperty()
  @Column({ name: 'action_message', nullable: true, length: 255 })
  actionMessage: string | null;

  @ApiProperty()
  @Column({ name: 'action_data', nullable: true, length: 2000 })
  actionData: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'transmission_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  transmissionAt: Date | null;

  @ApiProperty()
  @Column('datetime', { name: 'reception_at', nullable: true })
  receptionAt: Date | null;

  @ManyToOne(() => Event, (event) => event.eventLogs, {})
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Provider, (provider) => provider.eventLogs, {})
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => Consumer, (consumer) => consumer.eventLogs, {})
  @JoinColumn({ name: 'consumer_id' })
  consumer: Consumer;

  @ManyToOne(() => User, (user) => user.eventLogs, {})
  @JoinColumn({ name: 'user_id' })
  user: User;
}
