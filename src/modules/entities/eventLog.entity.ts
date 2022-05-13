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
import { LogActionType } from './logActionType.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('event_log', { schema: 'mycar' })
export class EventLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'log_type_id', nullable: true })
  logTypeId: number;

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
  @Column({ name: 'action_message', nullable: true, length: 1024 })
  actionMessage: string | null;

  @ApiProperty()
  @Column({ name: 'action_data', nullable: true, length: 256 })
  actionData: string | null;

  @ApiProperty()
  @Column({ name: 'raw_data', nullable: true, length: 4096 })
  rawData: string | null;

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

  @ManyToOne(
    () => LogActionType,
    (logActionType) => logActionType.logActionTypes,
  )
  @JoinColumn({ name: 'log_type_id' })
  logActionType: LogActionType;
}
