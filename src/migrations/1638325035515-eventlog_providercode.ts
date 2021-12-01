import {MigrationInterface, QueryRunner} from "typeorm";

export class eventlogProvidercode1638325035515 implements MigrationInterface {
    name = 'eventlogProvidercode1638325035515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` CHANGE \`provider_key\` \`provider_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`provider_code\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`provider_code\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_log\` DROP COLUMN \`provider_code\``);
        await queryRunner.query(`ALTER TABLE \`event_log\` ADD \`provider_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`event_log\` CHANGE \`provider_code\` \`provider_key\` varchar(255) NULL`);
    }

}
