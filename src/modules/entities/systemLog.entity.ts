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
import { Provider, User } from '.';
import { Consumer } from './consumer.entity';

@Entity('system_log', { schema: 'mycar' })
export class SystemLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ name: 'consumer_id', nullable: true })
  consumerId: number;

  @ApiProperty()
  @Column({ name: 'provider_id', nullable: true })
  providerId: number;

  @ApiProperty()
  @Column({ name: 'user_id', nullable: true })
  userId: number;

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

  @ManyToOne(() => Consumer, (consumer) => consumer.consumerLogs)
  @JoinColumn({ name: 'consumer_id' })
  public consumer: Consumer;

  @ManyToOne(() => Provider, (provider) => provider.providerLogs)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;

  @ManyToOne(() => User, (user) => user.userLogs)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
