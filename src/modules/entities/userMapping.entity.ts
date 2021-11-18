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

@Entity('user-mapping', { schema: 'mycar' })
export class UserMapping {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column('varchar', { name: 'key', length: 255 })
  key: string;
  @ApiProperty()
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;
  @ApiProperty()
  @Column('varchar', { name: 'mapping_status', nullable: true, length: 255 })
  mappingStatus: string | null;

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

  // @OneToMany(() => Event, (event) => event.userMapping)
  // events: Event[];

  @ManyToOne(() => User, (user) => user.userMappings)
  @JoinColumn({ name: 'user_id' })
  public user: User;
  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Consumer, (consumer) => consumer.userMappings)
  @JoinColumn({ name: 'consumer_id' })
  public consumer: Consumer;
  @ApiProperty()
  @Column({ name: 'consumer_id' })
  consumerId: number;

  @ManyToOne(() => Provider, (provider) => provider.userMappings)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;
  @ApiProperty()
  @Column({ name: 'provider_id' })
  providerId: number;
}
