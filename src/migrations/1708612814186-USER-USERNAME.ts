import { MigrationInterface, QueryRunner } from 'typeorm';

export class USERUSERNAME1708612814186 implements MigrationInterface {
  name = 'USERUSERNAME1708612814186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
