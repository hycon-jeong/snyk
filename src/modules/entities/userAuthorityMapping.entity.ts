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

@Entity('user-authority-mapping', { schema: 'mycar' })
export class UserAuthorityMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'provider_id', nullable: true })
  providerId: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ name: 'authority_id' })
  authorityId: number;

  @ApiProperty()
  @Column('varchar', { name: 'mapping_status', default: 'ACTIVE', length: 255 })
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

  @ManyToOne(() => User, (user) => user.userAuthorityMappings)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Provider, (provider) => provider.userAuthorityMappings)
  @JoinColumn({ name: 'provider_id' })
  public provider: Provider;

  @ManyToOne(() => Authority, (authority) => authority.userAuthorityMappings)
  @JoinColumn({ name: 'authority_id' })
  public authority: Authority;
}
