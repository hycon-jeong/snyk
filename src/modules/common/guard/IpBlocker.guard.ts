import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as requestIp from 'request-ip';
import { CrudBlockerService } from 'modules/api.admin/v1/blocker/blocker.service';
import * as net from 'net';
import { Address4, Address6 } from 'ip-address';
import * as dotenv from 'dotenv';
dotenv.config();

const { APP_PORT, APP_ENV } = process.env;

@Injectable()
export class IpBlockerGuard implements CanActivate {
  constructor(
    @Inject(CrudBlockerService)
    private readonly blockerService: CrudBlockerService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const ipList = await this.blockerService.find({ status: 'ACTIVE' });

    const allowedIps: Array<string> = ipList.map((v) => v.ipAddress);
    const ip = requestIp.getClientIp(request);

    let ipv4 = '';
    // ipv4
    if (net.isIP(ip) === 4) {
      ipv4 = ip;
      // ipv6
    } else if (net.isIP(ip) === 6) {
      const address = new Address6(ip);
      ipv4 = address.parsedAddress4;
    }
    console.log('ip v4 address => ' + ipv4, 'origin ip => ' + ip);
    // localhost , 127.0.0.1
    if (ip === '::1' || ipv4 === '127.0.0.1') {
      return true;
    }
    // ip release in dev
    if (APP_ENV === 'development') {
      return true;
    }

    return allowedIps.includes(ipv4);
  }
}
