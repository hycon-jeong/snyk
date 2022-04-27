import { MigrationInterface, QueryRunner } from 'typeorm';

export class addoptmessage1651041263017 implements MigrationInterface {
  name = 'addoptmessage1651041263017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`opt_message_title\` varchar(500) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`opt_message_content\` varchar(500) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`opt_sub_message_content\` varchar(500) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP COLUMN \`opt_sub_message_content\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP COLUMN \`opt_message_content\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP COLUMN \`opt_message_title\``,
    );
  }
}
