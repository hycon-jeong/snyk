import {MigrationInterface, QueryRunner} from "typeorm";

export class changetextcolor1651566538592 implements MigrationInterface {
    name = 'changetextcolor1651566538592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_text_color\` \`provider_text_color\` varchar(32) NOT NULL DEFAULT '#ffffff'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_text_color\` \`provider_text_color\` varchar(32) NOT NULL DEFAULT '#000000'`);
    }

}
