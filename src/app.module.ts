import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './infra/database/database.module'
import { HttpModule } from './infra/http/http.module'

@Module({
  imports: [HttpModule, DatabaseModule, ConfigModule.forRoot()],
})
export class AppModule {}
