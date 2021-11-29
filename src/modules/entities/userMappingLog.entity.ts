import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_mapping_log', { schema: 'mycar' })
export class UserMappingLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty()
  @Column('int', { primary: true, name: 'user_mapping_id' })
  userMappingId: number;

  @ApiProperty()
  @Column('varchar', { name: 'provider_name', nullable: true, length: 255 })
  providerName: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'consumer_name', nullable: true, length: 255 })
  consumerName: string | null;

  @ApiProperty()
  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @ApiProperty()
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
