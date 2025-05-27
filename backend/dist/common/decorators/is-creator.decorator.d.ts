import { Type } from '@nestjs/common';
export declare const IS_CREATOR_KEY = "isCreatorService";
export declare function IsCreator(serviceClass: Type<any>): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
