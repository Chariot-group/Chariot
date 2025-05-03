import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const serviceClass = this.reflector.get<Type<any>>('service', handler);

    if (!serviceClass) return true; // No service specified

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const resourceId = request.params?.id;

    if (!userId) throw new UnauthorizedException('User not authenticated');
    if (!resourceId) throw new ForbiddenException('Missing resource id');

    try {
      // Dynamically resolve the service using ModuleRef
      const service = await this.moduleRef.resolve(serviceClass);

      if (!service) {
        throw new ForbiddenException(`Service ${serviceClass} not found`);
      }

      const resource = await service.findOne(resourceId);
      if (!resource) throw new ForbiddenException('Resource not found');

      if (resource.data.createdBy?.toString() !== userId.toString()) {
        throw new ForbiddenException('Forbidden: not the creator');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
