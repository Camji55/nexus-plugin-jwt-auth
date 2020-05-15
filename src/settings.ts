import { Request } from 'express';

export type Settings = {
    appSecret: string
    protectedPaths?: string[],
    verify?: (res: Request) => any
}