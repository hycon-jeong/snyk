import {MigrationInterface, QueryRunner} from "typeorm";

export class adduserkey1647338384356 implements MigrationInterface {
    name = 'adduserkey1647338384356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_key\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_key\``);
    }

}
