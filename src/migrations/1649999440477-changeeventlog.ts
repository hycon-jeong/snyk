import {MigrationInterface, QueryRunner} from "typeorm";

export class changeeventlog1649999440477 implements MigrationInterface {
    name = 'changeeventlog1649999440477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`user_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`user_id\` varchar(255) NULL`);
    }

}
