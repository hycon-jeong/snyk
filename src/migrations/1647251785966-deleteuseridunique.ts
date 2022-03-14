import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteuseridunique1647251785966 implements MigrationInterface {
    name = 'deleteuseridunique1647251785966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_96aac72f1574b88752e9fb0008\` ON \`users\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_96aac72f1574b88752e9fb0008\` ON \`users\` (\`user_id\`)`);
    }

}
