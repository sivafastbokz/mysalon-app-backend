import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor( private readonly jwtService:JwtService ) {}
 async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    // console.log(request)
    const authorizationHeader = request.headers.authorization
    if (!authorizationHeader) {
        throw new HttpException('Token Not Found', HttpStatus.NOT_FOUND);
      }
      const token = authorizationHeader.split(' ')[1];
      const decode = await this.jwtService.verify(token)
      request.userId = decode.userId
      return true;
  }
}