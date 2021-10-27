import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from './eventType.entity';
import { Message } from './message.entity';
import { UserMapping } from './userMapping.entity';
import { EventLog } from './eventLog.entity';
import { Eventitemresult } from './eventitemresult.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('event', { schema: 'mycar' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'message_id', length: 255 })
  messageId: string;

  @ApiProperty()
  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_id', nullable: true, length: 255 })
  providerId: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_key', nullable: true, length: 255 })
  providerKey: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_code', nullable: true, length: 255 })
  providerCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'event_type', length: 255 })
  eventType: string;

  @ApiProperty()
  @Column('varchar', { name: 'categroy', nullable: true, length: 255 })
  categroy: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'issued_at', nullable: true })
  issuedAt: Date | null;

  @ApiProperty()
  @Column('int', { name: 'user_mapping_id' })
  userMappingId: number;

  @ManyToOne(() => EventType, (eventType) => eventType.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'event_type', referencedColumnName: 'eventType' }])
  eventType2: EventType;

  @ManyToOne(() => Message, (message) => message.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'message_id', referencedColumnName: 'messageId' }])
  message: Message;

  @ManyToOne(() => UserMapping, (userMapping) => userMapping.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: UserMapping;

  @OneToMany(() => EventLog, (eventLog) => eventLog.event)
  eventLogs: EventLog[];

  @OneToMany(() => Eventitemresult, (eventitemresult) => eventitemresult.event)
  eventitemresults: Eventitemresult[];
}
