import {MigrationInterface, QueryRunner} from "typeorm";

export class addrawdatainuserlog1650197670187 implements MigrationInterface {
    name = 'addrawdatainuserlog1650197670187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`raw_data\` varchar(4096) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`raw_data\``);
    }

}
