import { Request } from 'express';

export type Settings = {
    appSecret: string
    protectedPaths?: string[],
    verify?: (req: Request) => Promise<any> | any
}