import { SetMetadata } from "@nestjs/common"

export const ROLE_KEY = 'role_level'

export const RequireLevel = (level: number)=>
    SetMetadata(ROLE_KEY, level)