import {MigrationInterface, QueryRunner} from "typeorm";

export class addtitleincategory1646035137321 implements MigrationInterface {
    name = 'addtitleincategory1646035137321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`title\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`title\``);
    }

}
