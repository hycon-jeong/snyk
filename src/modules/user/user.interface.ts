export class UserFillableFields {
  userId: string;
  name: string;
  password: string;
  roleId: number;
}

export class UserMappingFillableFields {
  userId: number;
  providerId: any;
  consumerId: number;
  tvDeviceId?: number;
  key: string;
  mappingStatus: string;
  name: string;
}
