import {MigrationInterface, QueryRunner} from "typeorm";

export class addtextcolorinprovider1651565165827 implements MigrationInterface {
    name = 'addtextcolorinprovider1651565165827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` ADD \`provider_text_color\` varchar(32) NOT NULL DEFAULT '#000000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` DROP COLUMN \`provider_text_color\``);
    }

}
