import {MigrationInterface, QueryRunner} from "typeorm";

export class removeEventType1645606711981 implements MigrationInterface {
    name = 'removeEventType1645606711981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_b966ddf4f5772104155218035a6\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event\` ADD CONSTRAINT \`FK_b966ddf4f5772104155218035a6\` FOREIGN KEY (\`event_type_id\`) REFERENCES \`event_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
