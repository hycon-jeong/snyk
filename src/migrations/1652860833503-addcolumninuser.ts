import {MigrationInterface, QueryRunner} from "typeorm";

export class addcolumninuser1652860833503 implements MigrationInterface {
    name = 'addcolumninuser1652860833503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_logined_at\` timestamp NULL COMMENT '마지막 로그인일'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`fail_count\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`fail_count\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_logined_at\``);
    }

}
