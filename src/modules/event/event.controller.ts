import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Event } from 'modules/entities';
import { FirebaseMessagingService } from 'modules/firebase';
import CrudsEventService from './event.service';

@ApiBearerAuth()
@Crud({
  model: {
    type: Event,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
})
@UseGuards(AuthGuard())
@Controller('api/event')
@ApiTags('event')
export class CrudEventController implements CrudController<Event> {
  constructor(
    private firebaseMessage: FirebaseMessagingService,
    public readonly service: CrudsEventService,
  ) {}
  get base(): CrudController<Event> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Event) {
    // client generate token for each device, send that token to backend
    // need store device token on db
    // send to device base on that token
    this.firebaseMessage.sendToDevice(
      'djGVb9OwqSjJSJo1n-mI02:APA91bHaODR7MnOdKKOn5MovxOSdHEsPG5B82NoYH90EZH4v45hQjqzKk_y7FTlptOrrFWU_lUx6rgAXllZBJPVHEjx_5M0i0Yz-uEboG67fUHtt6agvM56QCOwDu0kszgrnFIuCaz0R',
      {
        notification: {
          title: 'tesst111',
          body: 'ddddddddddaaaccvd',
        },
      },
    );
    return this.base.createOneBase(req, dto);
  }
}
