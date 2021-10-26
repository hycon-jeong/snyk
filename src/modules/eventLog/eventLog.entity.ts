import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_log', { schema: 'mycar' })
export class EventLogEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('int', { name: 'event_event_id' })
  eventEventId: number;

  @ApiProperty()
  @Column('int', { name: 'event_event_event_id' })
  eventEventEventId: number;

  @ApiProperty()
  @Column('varchar', { name: 'event_type', nullable: true, length: 45 })
  eventType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 45 })
  status: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'date_at', nullable: true })
  dateAt: Date | null;

  @ApiProperty()
  @Column('int', { name: 'user_id', nullable: true })
  userId: number | null;

  @ApiProperty()
  @Column('varchar', { name: 'categroy', nullable: true, length: 45 })
  categroy: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_code', nullable: true, length: 45 })
  consumerCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_key', nullable: true, length: 45 })
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
}
