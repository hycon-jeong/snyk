import {
  Column,
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

  // @ManyToOne(() => User, (users) => users.id, {})
  // @JoinColumn({ name: 'user_id' })
  // user: User;

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
  @Column('varchar', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'issued_at', nullable: true })
  issuedAt: Date | null;

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
  message_id: number;
  @Column({ name: 'user_mapping_id' })
  user_mapping_id: number;
  // @Column({ name: 'user_id' })
  // user_id: number;
}
