import * as bcrypt from 'bcrypt';

export async function hashedPassword(rawPassword:string) {
    const saltRounds = 12
    return bcrypt.hash(rawPassword,saltRounds)
}