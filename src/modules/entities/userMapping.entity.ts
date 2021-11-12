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

  @OneToMany(() => Event, (event) => event.userMapping)
  events: Event[];

  @ManyToOne(() => User, (user) => user.userMappings)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Consumer, (consumer) => consumer.userMappings)
  @JoinColumn({ name: 'consumer_id' })
  public consumer: Consumer;

  @ManyToOne(() => Provider, (provider) => provider.userMappings)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;
}
