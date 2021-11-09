import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { EventLog, Message } from 'modules/entities';
import { MessageService } from './message.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Message,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@UseGuards(AuthGuard())
@Controller('api/message')
@ApiTags('message')
export class MessageController implements CrudController<Message> {
  constructor(public readonly service: MessageService) {}
}
