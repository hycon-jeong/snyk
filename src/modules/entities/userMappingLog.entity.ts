import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserMapping } from './userMapping.entity';

@Entity('user_mapping_log', { schema: 'mycar' })
export class UserMappingLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { primary: true, name: 'user_mapping_id' })
  userMappingId: number;

  @Column('varchar', { name: 'provider_name', nullable: true, length: 255 })
  providerName: string | null;

  @Column('varchar', { name: 'consumer_name', nullable: true, length: 255 })
  consumerName: string | null;

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @Column('datetime', {
    name: 'date_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAt: Date | null;

  // @ManyToOne(() => UserMapping, (userMapping) => userMapping.userMappingLogs, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  // @JoinColumn([
  //   {
  //     name: 'user_mapping_id',
  //     referencedColumnName: 'id',
  //   },
  // ])
  // userMapping: UserMapping;
}
