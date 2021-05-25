// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     let token: string = '';

//     console.log(req.headers);

//     const header: string | undefined = req.headers.authorization;

//     if (header && header.startsWith('Bearer')) {
//       token = header.split(' ')[1];
//     }

//     if (req.cookies.token) {
//       token = req.cookies.token;
//     }

//     // Make sure token exists
//     if (!token)
//         throw new UnauthorizedException('Unauthorized to access this route.');

//     // Verify token
//     const decoded =  new JwtService({});
    
//     // decoded.verify(token, String(process.env.JWT_SECRET));

//     console.log(decoded);

//     // (req as any).user = await User.findById(decoded.id);
//     next();
//   }
// }
