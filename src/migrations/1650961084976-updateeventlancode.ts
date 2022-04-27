import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateeventlancode1650961084976 implements MigrationInterface {
  name = 'updateeventlancode1650961084976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`language_code\` \`language_code\` varchar(16) NULL DEFAULT 'ko'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` CHANGE \`language_code\` \`language_code\` varchar(16) NULL`,
    );
  }
}
