import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { UserMapping } from './userMapping.entity';
import { EventLog } from './eventLog.entity';
import { Eventitemresult } from './eventitemresult.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { EventStatus } from 'modules/common/constants/eventStatus';
import { Provider } from '.';
import { Category } from './category.entity';

@Entity('event', { schema: 'mycar' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'user_mapping_id' })
  userMappingId: number;

  @ApiProperty()
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ApiProperty()
  @Column('varchar', { name: 'provider_key', nullable: true, length: 255 })
  providerKey: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'provider_code', nullable: true, length: 255 })
  providerCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'message_content', nullable: true, length: 500 })
  messageContent: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'sub_message_content',
    nullable: true,
    length: 500,
  })
  subMessageContent: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'opt_message_title', nullable: true, length: 500 })
  optMsgTitle: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'opt_message_content',
    nullable: true,
    length: 500,
  })
  optMsgContent: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'opt_sub_message_content',
    nullable: true,
    length: 500,
  })
  optMsgSubContent: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @ApiProperty()
  @Column('varchar', {
    name: 'language_code',
    nullable: true,
    length: 16,
    default: 'ko',
  })
  languageCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'callback_url', nullable: true, length: 500 })
  callbackUrl: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'redirect_url', nullable: true, length: 500 })
  redirectUrl: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'message_title', nullable: true, length: 500 })
  messageTitle: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'event_type', nullable: true, length: 20 })
  eventType: string | null;

  @ApiProperty()
  @Column('timestamp', {
    name: 'issued_at',
    nullable: true,
    comment: '이벤트 발행일(프로바이더에서 받은 이벤트 발행일)',
  })
  issuedAt: Date | null;

  @ApiProperty()
  @Column('timestamp', {
    name: 'received_at',
    nullable: true,
    comment: 'tv앱에서 이벤트 수신일',
  })
  receivedAt: Date | null;

  @ApiProperty()
  @Column('timestamp', {
    name: 'completed_at',
    nullable: true,
    comment: 'tv앱에서 이벤트 확인일',
  })
  completedAt: Date | null;

  @ApiProperty()
  @Column('timestamp', {
    name: 'failed_at',
    nullable: true,
    comment: '이벤트 오류일',
  })
  failedAt: Date | null;

  @ApiProperty()
  @Column({
    type: 'enum',
    name: 'status',
    enum: EventStatus,
    default: EventStatus.SENDING,
  })
  status: EventStatus;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @OneToMany(() => EventLog, (eventLog) => eventLog.event)
  eventLogs: EventLog[];

  @OneToMany(() => Eventitemresult, (eventitemresult) => eventitemresult.event)
  eventitemresults: Eventitemresult[];

  @ManyToOne(() => UserMapping, (userMapping) => userMapping.events)
  @JoinColumn({ name: 'user_mapping_id' })
  userMapping: UserMapping;

  @ManyToOne(() => Message, (message) => message.events, {})
  @JoinColumn({ name: 'message_id' })
  message: Message;

  @ManyToOne(() => Provider, (provider) => provider.events, {})
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => Category, (category) => category.events, {})
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id', nullable: true })
  category_id: number;

  @Column({ name: 'provider_id' })
  providerId: number;

  @Column({ name: 'message_id', nullable: true })
  messageId: number;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
