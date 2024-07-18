import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1720799708490 implements MigrationInterface {
    name = 'Migrate1720799708490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`home\` ADD \`hidden_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`home\` DROP COLUMN \`hidden_at\``);
    }

}
