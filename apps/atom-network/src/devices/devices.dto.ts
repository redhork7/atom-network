export interface IDevicesRegisterDto {
  uuid: string;
  userAgent?: string;
}

export interface IDevicesSetOwnerDto {
  uid: number;
  accountUid: number;
}

export interface IDevicesSetFreeDto {
  uid: number;
}
