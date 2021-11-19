import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEmail1637223130569 implements MigrationInterface {
  name = 'userEmail1637223130569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`email\` varchar(255) NULL`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    // );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_65cbf5fcb331619593ee334c7c\` ON \`users\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_65cbf5fcb331619593ee334c7c\` ON \`users\``,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    // );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
  }
}
