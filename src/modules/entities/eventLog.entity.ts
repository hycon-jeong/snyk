import {
  Column,
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

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('event_log', { schema: 'mycar' })
export class EventLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ groups: [CREATE, UPDATE] })
  @MaxLength(255, { groups: [CREATE, UPDATE] })
  @Column('varchar', { name: 'event_type', nullable: true, length: 255 })
  eventType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 45 })
  status: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'date_at', nullable: true })
  dateAt: Date | null;

  @ApiProperty()
  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'category', nullable: true, length: 255 })
  category: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_code', nullable: true, length: 255 })
  consumerCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_key', nullable: true, length: 255 })
  providerKey: string | null;

  @ApiProperty()
  @Column('json', { name: 'message', nullable: true })
  message: object | null;

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
