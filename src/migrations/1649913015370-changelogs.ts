import {MigrationInterface, QueryRunner} from "typeorm";

export class changelogs1649913015370 implements MigrationInterface {
    name = 'changelogs1649913015370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumer_log\` ADD \`message\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`message\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` ADD \`message\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` ADD \`date_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP FOREIGN KEY \`FK_86d86e827a8e203ef7d390e081e\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`date_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`provider_log\` ADD \`date_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`blocker\` DROP FOREIGN KEY \`FK_67230ccfaccf65d34ef17b71115\``);
        await queryRunner.query(`ALTER TABLE \`blocker\` CHANGE \`provider_id\` \`provider_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD CONSTRAINT \`FK_86d86e827a8e203ef7d390e081e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD CONSTRAINT \`FK_7289efef987acdae48533cfdcb0\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blocker\` ADD CONSTRAINT \`FK_67230ccfaccf65d34ef17b71115\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blocker\` DROP FOREIGN KEY \`FK_67230ccfaccf65d34ef17b71115\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP FOREIGN KEY \`FK_7289efef987acdae48533cfdcb0\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP FOREIGN KEY \`FK_86d86e827a8e203ef7d390e081e\``);
        await queryRunner.query(`ALTER TABLE \`blocker\` CHANGE \`provider_id\` \`provider_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blocker\` ADD CONSTRAINT \`FK_67230ccfaccf65d34ef17b71115\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`provider_log\` ADD \`date_at\` datetime(0) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD \`date_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_log\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_log\` ADD CONSTRAINT \`FK_86d86e827a8e203ef7d390e081e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` DROP COLUMN \`date_at\``);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` ADD \`date_at\` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`provider_log\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`message\``);
        await queryRunner.query(`ALTER TABLE \`user_log\` DROP COLUMN \`provider_id\``);
        await queryRunner.query(`ALTER TABLE \`consumer_log\` DROP COLUMN \`message\``);
    }

}
