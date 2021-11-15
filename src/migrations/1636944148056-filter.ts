import {MigrationInterface, QueryRunner} from "typeorm";

export class filter1636944148056 implements MigrationInterface {
    name = 'filter1636944148056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_8daf2126b94b7321a7845403899\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_b966ddf4f5772104155218035a6\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_440d4288846d5c59e9de481b03c\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_5909c68aaa21522907e8b9780d6\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e6358bd3df1b2874637dca92bcf\``);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`provider_id\` \`provider_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`event_type_id\` \`event_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`message_id\` \`message_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`user_mapping_id\` \`user_mapping_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e6358bd3df1b2874637dca92bcf\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_5909c68aaa21522907e8b9780d6\` FOREIGN KEY (\`user_mapping_id\`) REFERENCES \`user-mapping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_440d4288846d5c59e9de481b03c\` FOREIGN KEY (\`message_id\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_b966ddf4f5772104155218035a6\` FOREIGN KEY (\`event_type_id\`) REFERENCES \`event_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_8daf2126b94b7321a7845403899\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_8daf2126b94b7321a7845403899\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_b966ddf4f5772104155218035a6\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_440d4288846d5c59e9de481b03c\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_5909c68aaa21522907e8b9780d6\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_e6358bd3df1b2874637dca92bcf\``);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`user_mapping_id\` \`user_mapping_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`message_id\` \`message_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`event_type_id\` \`event_type_id\` int NULL COMMENT 'Db generic id'`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`provider_id\` \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_e6358bd3df1b2874637dca92bcf\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_5909c68aaa21522907e8b9780d6\` FOREIGN KEY (\`user_mapping_id\`) REFERENCES \`user-mapping\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_440d4288846d5c59e9de481b03c\` FOREIGN KEY (\`message_id\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_b966ddf4f5772104155218035a6\` FOREIGN KEY (\`event_type_id\`) REFERENCES \`event_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_8daf2126b94b7321a7845403899\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
