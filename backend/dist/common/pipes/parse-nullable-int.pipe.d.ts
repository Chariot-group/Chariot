import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ParseNullableIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
