import { MigrationInterface, QueryRunner } from 'typeorm';

export class changetvDevice1644889813117 implements MigrationInterface {
  name = 'changetvDevice1644889813117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tv_device\` CHANGE \`expire_dt\` \`reg_dt\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`tv_device\` DROP COLUMN \`reg_dt\``);
  }
}
