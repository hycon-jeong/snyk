import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_log', { schema: 'mycar' })
export class UserLog {
  @Column('varchar', { primary: true, name: 'user_log_id', length: 255 })
  userLogId: string;

  @Column('varchar', { name: 'role', nullable: true, length: 255 })
  role: string | null;

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  @Column('datetime', {
    name: 'date_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAt: Date | null;

  @ManyToOne(() => User, (users) => users.userLogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
