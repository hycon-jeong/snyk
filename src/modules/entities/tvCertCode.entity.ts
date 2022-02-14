import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provider } from './provider.entity';

@Entity('tv_cert_code', { schema: 'mycar' })
export class TvCertCode {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('varchar', { name: 'tv_device_token', nullable: true, length: 255 })
  tvDeviceToken: Date | null;

  @ApiProperty()
  @Column('varchar', { name: 'tv_type', nullable: true, length: 255 })
  tvType: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'tv_cert_code', nullable: true, length: 255 })
  tvCertCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'tv_verify_code', nullable: true, length: 255 })
  tvVerifyCode: string | null;

  @ApiProperty()
  @Column('datetime', { name: 'expire_dt', nullable: true })
  expireDt: Date | null;
}
