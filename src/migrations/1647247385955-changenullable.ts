import {MigrationInterface, QueryRunner} from "typeorm";

export class changenullable1647247385955 implements MigrationInterface {
    name = 'changenullable1647247385955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_697909a55bde1b28a90560f3ae2\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_440d4288846d5c59e9de481b03c\``);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`category_id\` \`category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`message_id\` \`message_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_440d4288846d5c59e9de481b03c\` FOREIGN KEY (\`message_id\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_697909a55bde1b28a90560f3ae2\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_697909a55bde1b28a90560f3ae2\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_440d4288846d5c59e9de481b03c\``);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`message_id\` \`message_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` CHANGE \`category_id\` \`category_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_440d4288846d5c59e9de481b03c\` FOREIGN KEY (\`message_id\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_697909a55bde1b28a90560f3ae2\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
