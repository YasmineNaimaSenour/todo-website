declare module 'jsonwebtoken' {
    export function sign(payload: any, secret: string, options?: { expiresIn?: string }): string;
    export function verify(token: string, secret: string): any;
} 