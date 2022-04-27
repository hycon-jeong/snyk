import { MigrationInterface, QueryRunner } from 'typeorm';

export class addeventcolumn1651038180762 implements MigrationInterface {
  name = 'addeventcolumn1651038180762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`received_at\` datetime NULL COMMENT 'tv앱에서 이벤트 수신일'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`completed_at\` datetime NULL COMMENT 'tv앱에서 이벤트 확인일'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`failed_at\` datetime NULL COMMENT '이벤트 오류일'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`issued_at\` \`issued_at\` datetime NULL COMMENT '이벤트 발행일(프로바이더에서 받은 이벤트 발행일)'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`status\` \`status\` enum ('SENDING', 'COMPLETE', 'RECEIVE', 'FAIL') NOT NULL DEFAULT 'SENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`status\` \`status\` enum ('SENDING', 'COMPLETE', 'FAIL') NOT NULL DEFAULT 'SENDING'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`issued_at\` \`issued_at\` datetime NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`failed_at\``);
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP COLUMN \`completed_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP COLUMN \`received_at\``,
    );
  }
}
