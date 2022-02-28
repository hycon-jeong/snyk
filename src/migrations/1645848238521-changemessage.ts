import { MigrationInterface, QueryRunner } from 'typeorm';

export class changemessage1645848238521 implements MigrationInterface {
  name = 'changemessage1645848238521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP COLUMN \`transmission_flag\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP COLUMN \`reception_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP COLUMN \`transmission_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`message\``);
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`message\` varchar(500) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`message\``);
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`message\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`transmission_at\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`reception_at\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`message\` ADD \`transmission_flag\` tinyint(1) NULL`,
    );
  }
}
