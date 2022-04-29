import { MigrationInterface, QueryRunner } from 'typeorm';

export class changelogcolumn1651211130407 implements MigrationInterface {
  name = 'changelogcolumn1651211130407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event_log\` ADD \`raw_data\` varchar(4096) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_log\` MODIFY \`action_message\` varchar(1024) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_log\` MODIFY \`action_data\` varchar(256) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event_log\` MODIFY \`action_message\` varchar(1024) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event_log\` MODIFY \`action_data\` varchar(256) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`user_log\` MODIFY \`action_message\` varchar(1024) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`user_log\` MODIFY \`action_data\` varchar(256) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_log\` MODIFY \`action_data\` varchar(2000) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`user_log\` MODIFY \`action_message\` varchar(255) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event_log\` MODIFY \`action_data\` varchar(2000) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`event_log\` MODIFY \`action_message\` varchar(255) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_log\` MODIFY \`action_data\` varchar(2000) NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`system_log\` MODIFY \`action_message\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_log\` DROP COLUMN \`raw_data\``,
    );
  }
}
