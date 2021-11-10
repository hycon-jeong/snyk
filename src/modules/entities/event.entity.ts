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
import { User } from './user.entity';
import { EventStatus } from 'modules/common/constants/eventStatus';

@Entity('event', { schema: 'mycar' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => User, (users) => users.id, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

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
  @Column('varchar', { name: 'image_url', nullable: true})
  imageUrl: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'issued_at', nullable: true })
  issuedAt: Date | null;

  @ManyToOne(() => EventType, (eventType) => eventType.events, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'event_type', referencedColumnName: 'eventType' }])
  eventType2: EventType;

  @ManyToOne(() => Message, (message) => message.id, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ApiProperty()
  @Column({
    type: 'enum',
    name: 'status',
    enum: EventStatus,
    default: EventStatus.SENDING,
  })
  status: EventStatus;

  // @ApiProperty()
  // @ManyToOne(() => UserMapping, (userMapping) => userMapping.id, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn({ name: 'user_mapping_id' })
  // userMapping: UserMapping;

  @OneToMany(() => EventLog, (eventLog) => eventLog.event)
  eventLogs: EventLog[];

  @OneToMany(() => Eventitemresult, (eventitemresult) => eventitemresult.event)
  eventitemresults: Eventitemresult[];
}
function ApiModelProperty(arg0: { type: typeof User }) {
  throw new Error('Function not implemented.');
}
