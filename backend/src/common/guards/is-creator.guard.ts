import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

interface IResource {
  createdBy: string;
}

@Injectable()
export class IsCreatorGuard<T extends IResource> implements CanActivate {
  constructor(
    @InjectModel('Resource') private readonly model: Model<T>, // Provide the model name here
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const resourceId = request.params.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (!resourceId) {
      throw new ForbiddenException('Resource ID is required');
    }

    return this.verifyResourceOwnership(resourceId, userId);
  }

  private async verifyResourceOwnership(
    resourceId: string,
    userId: string,
  ): Promise<boolean> {
    const resource = await this.model.findById(resourceId).exec();
    if (!resource) {
      throw new ForbiddenException('Resource not found');
    }

    if (resource.createdBy?.toString() !== userId.toString()) {
      throw new ForbiddenException(
        'Forbidden: User is not the creator of the resource',
      );
    }

    return true;
  }
}
