import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserMapping } from '.';
import { Provider } from './provider.entity';

@Entity('tv_device', { schema: 'mycar' })
export class TvDevice {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'tv_device_token', nullable: true, length: 255 })
  tvDeviceToken: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'tv_type', nullable: true, length: 255 })
  tvType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true })
  status: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @OneToMany(() => UserMapping, (userMapping) => userMapping.tvDevice)
  userMappings: UserMapping[];
}
