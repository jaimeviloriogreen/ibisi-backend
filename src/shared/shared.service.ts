import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class SharedService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  verifyChangesOnUpdate(
    currentData: Record<string, any>,
    updateData: Record<string, any>,
  ): boolean {
    // Compares the values of the fields
    return Object.keys(updateData).some(
      (key) => updateData[key] !== currentData[key],
    );
  }
}
