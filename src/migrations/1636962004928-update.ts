import { MigrationInterface, QueryRunner } from 'typeorm';

export class update1636962004928 implements MigrationInterface {
  name = 'update1636962004928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_5909c68aaa21522907e8b9780d6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP COLUMN \`user_mapping_id\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD \`user_mapping_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_5909c68aaa21522907e8b9780d6\` FOREIGN KEY (\`user_mapping_id\`) REFERENCES \`user-mapping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
