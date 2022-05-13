import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Consumer } from './consumer.entity';
import { Provider } from './provider.entity';
import { User } from './user.entity';
import { UserMappingLog } from './userMappingLog.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TvDevice } from './tvDevice.entity';
import { Authority } from './authority.entity';
import { EventLog, UserLog } from '.';
import { SystemLog } from './systemLog.entity';

@Entity('log_action_type', { schema: 'mycar' })
export class LogActionType {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'parent_id', nullable: true })
  parentId: number | null;

  @ApiProperty()
  @Column('varchar', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'code', nullable: true })
  code: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', default: 'ACTIVE' })
  status: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @ManyToOne(
    () => LogActionType,
    (logActionType) => logActionType.logActionTypes,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  logActionType: LogActionType;

  @OneToMany(() => LogActionType, (logActionType) => logActionType.parentId)
  logActionTypes: LogActionType[];

  @OneToMany(() => UserLog, (userLog) => userLog.logActionType)
  userLogs: UserLog[];

  @OneToMany(() => EventLog, (eventLog) => eventLog.logActionType)
  eventLog: EventLog[];

  @OneToMany(() => SystemLog, (systemLog) => systemLog.logActionType)
  systemLog: SystemLog[];
}
