import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from '.';
import { User } from './user.entity';

@Entity('user_log', { schema: 'mycar' })
export class UserLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ name: 'provider_id', nullable: true })
  providerId: number;

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @ApiProperty()
  @Column({ name: 'action_message', nullable: true, length: 255 })
  actionMessage: string | null;

  @ApiProperty()
  @Column({ name: 'action_data', nullable: true, length: 2000 })
  actionData: string | null;

  @ApiProperty()
  @Column({ name: 'raw_data', nullable: true, length: 4096 })
  rawData: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'date_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  dateAt: Date | null;

  @ManyToOne(() => User, (user) => user.userLogs)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Provider, (provider) => provider.providerLogs)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;
}
