import {MigrationInterface, QueryRunner} from "typeorm";

export class removeEventType11645606797892 implements MigrationInterface {
    name = 'removeEventType11645606797892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_b966ddf4f5772104155218035a6\` ON \`event\``);
        await queryRunner.query(`ALTER TABLE \`event\` DROP COLUMN \`event_type_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD \`event_type_id\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_b966ddf4f5772104155218035a6\` ON \`event\` (\`event_type_id\`)`);
    }

}
