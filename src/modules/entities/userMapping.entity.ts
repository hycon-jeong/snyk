import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Consumer } from './consumer.entity';
import { Provider } from './provider.entity';
import { User } from './user.entity';
import { UserMappingLog } from './userMappingLog.entity';

@Entity('user-mapping', { schema: 'mycar' })
export class UserMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'user_id', length: 255 })
  userId: string;

  @Column('varchar', { name: 'provider_code', nullable: true, length: 255 })
  providerCode: string | null;

  @Column('varchar', { name: 'consumer_code', nullable: true, length: 255 })
  consumerCode: string | null;

  @Column('varchar', { name: 'key', length: 255 })
  key: string;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'mapping_status', nullable: true, length: 255 })
  mappingStatus: string | null;

  @Column('datetime', {
    name: 'mapping_createAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  mappingCreateAt: Date | null;

  @Column('datetime', { name: 'mapping_updateat', nullable: true })
  mappingUpdateat: Date | null;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @ManyToOne(() => Consumer, (consumer) => consumer.userMappings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'consumer_code', referencedColumnName: 'consumerCode' }])
  consumerCode2: Consumer;

  @ManyToOne(() => Provider, (provider) => provider.userMappings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'provider_code', referencedColumnName: 'providerCode' }])
  providerCode2: Provider;

  @ManyToOne(() => User, (users) => users.userMappings, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @OneToMany(
    () => UserMappingLog,
    (userMappingLog) => userMappingLog.userMapping,
  )
  userMappingLogs: UserMappingLog[];
}
