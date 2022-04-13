import {MigrationInterface, QueryRunner} from "typeorm";

export class addcodeinauthority1649829995872 implements MigrationInterface {
    name = 'addcodeinauthority1649829995872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authority\` ADD \`code\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`authority\` DROP COLUMN \`code\``);
    }

}
