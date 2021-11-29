import {MigrationInterface, QueryRunner} from "typeorm";

export class addstatus1638152302632 implements MigrationInterface {
    name = 'addstatus1638152302632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` ADD \`status\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`status\``);
    }

}
