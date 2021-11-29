import {MigrationInterface, QueryRunner} from "typeorm";

export class consumerChangeNullable1638166446896 implements MigrationInterface {
    name = 'consumerChangeNullable1638166446896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer_log\` DROP FOREIGN KEY \`FK_dc2acd6d548d9283f4c7a86a257\``);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` CHANGE \`consumer_id\` \`consumer_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` DROP FOREIGN KEY \`FK_aa765a73865fb305a2486516afb\``);
        await queryRunner.query(`ALTER TABLE \`provider_log\` CHANGE \`provider_id\` \`provider_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_name\` \`provider_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_background_url\` \`provider_background_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_logo_url\` \`provider_logo_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`status\` \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` ADD CONSTRAINT \`FK_dc2acd6d548d9283f4c7a86a257\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` ADD CONSTRAINT \`FK_aa765a73865fb305a2486516afb\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`provider_log\` DROP FOREIGN KEY \`FK_aa765a73865fb305a2486516afb\``);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` DROP FOREIGN KEY \`FK_dc2acd6d548d9283f4c7a86a257\``);
        await queryRunner.query(`ALTER TABLE \`consumer\` CHANGE \`status\` \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`status\` \`status\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_logo_url\` \`provider_logo_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_background_url\` \`provider_background_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`provider\` CHANGE \`provider_name\` \`provider_name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` CHANGE \`provider_id\` \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` ADD CONSTRAINT \`FK_aa765a73865fb305a2486516afb\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` CHANGE \`consumer_id\` \`consumer_id\` int NULL COMMENT 'Db generic id'`);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` ADD CONSTRAINT \`FK_dc2acd6d548d9283f4c7a86a257\` FOREIGN KEY (\`consumer_id\`) REFERENCES \`consumer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
