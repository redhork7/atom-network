import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1718435830852 implements MigrationInterface {
    name = 'Migrate1718435830852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sso\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`credential\` varchar(512) NOT NULL COMMENT '인증정보', \`channel\` enum ('1', '2', '3', '4', '5', '6') NOT NULL COMMENT '인증채널', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`expired_at\` timestamp(6) NULL, \`account_uid\` int NULL, PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(60) NULL COMMENT '아이디', \`password\` varchar(128) NULL COMMENT '비밀번호', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`expired_at\` timestamp(6) NULL, UNIQUE INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` (\`id\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`device\` (\`uid\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(260) NOT NULL COMMENT '고유번호', \`user_agent\` varchar(120) NULL COMMENT '기기정보', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`account_uid\` int NULL, UNIQUE INDEX \`IDX_0683d0c6ce6c0327208a026da5\` (\`uuid\`), PRIMARY KEY (\`uid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sso\` ADD CONSTRAINT \`FK_7bb0aee48b7f6474d47f02b7bcf\` FOREIGN KEY (\`account_uid\`) REFERENCES \`account\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_d35e60a58c0919b8a3bb6601057\` FOREIGN KEY (\`account_uid\`) REFERENCES \`account\`(\`uid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_d35e60a58c0919b8a3bb6601057\``);
        await queryRunner.query(`ALTER TABLE \`sso\` DROP FOREIGN KEY \`FK_7bb0aee48b7f6474d47f02b7bcf\``);
        await queryRunner.query(`DROP INDEX \`IDX_0683d0c6ce6c0327208a026da5\` ON \`device\``);
        await queryRunner.query(`DROP TABLE \`device\``);
        await queryRunner.query(`DROP INDEX \`IDX_54115ee388cdb6d86bb4bf5b2e\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`sso\``);
    }

}
