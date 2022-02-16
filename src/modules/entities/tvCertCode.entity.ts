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
  @Column('int', { name: 'tv_device_id', nullable: true })
  tvDeviceId: number | null;

  @ApiProperty()
  @Column('varchar', { name: 'tv_cert_code', nullable: true, length: 255 })
  tvCertCode: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'tv_verify_code', nullable: true, length: 255 })
  tvVerifyCode: string | null;

  @ApiProperty()
  @Column('timestamp', { name: 'expire_dt', nullable: true })
  expireDt: Date | null;
}
