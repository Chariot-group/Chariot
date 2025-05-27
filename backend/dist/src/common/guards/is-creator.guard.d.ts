import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModuleRef } from '@nestjs/core';
export declare class IsCreatorGuard implements CanActivate {
    private reflector;
    private moduleRef;
    constructor(reflector: Reflector, moduleRef: ModuleRef);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
