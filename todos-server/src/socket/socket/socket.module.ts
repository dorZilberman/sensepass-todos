import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';

@Module({
    imports: [],
    exports: [AppGateway],
    providers: [AppGateway],
})
export class SocketModule { }