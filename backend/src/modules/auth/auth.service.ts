import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { env } from "../../config/env.js";
import { prisma } from "../../database/prisma.js";
import { AppError } from "../../common/exceptions/app-error.js";

function signAccessToken(user: { id: string; email: string; role: string }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as any
  });
}

function signRefreshToken(user: { id: string; email: string; role: string }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any
  });
}

export const authService = {
  async register(input: { name: string; email: string; password: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } });

    if (existingUser) {
      throw new AppError(StatusCodes.CONFLICT, "User already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash
      }
    });

    return {
      user,
      accessToken: signAccessToken({ id: user.id, email: user.email, role: user.role }),
      refreshToken: signRefreshToken({ id: user.id, email: user.email, role: user.role })
    };
  },

  async login(input: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });

    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    return {
      user,
      accessToken: signAccessToken({ id: user.id, email: user.email, role: user.role }),
      refreshToken: signRefreshToken({ id: user.id, email: user.email, role: user.role })
    };
  },

  async refresh(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
        sub: string;
        email: string;
        role: string;
      };

      return {
        accessToken: signAccessToken({ id: payload.sub, email: payload.email, role: payload.role }),
        refreshToken: signRefreshToken({ id: payload.sub, email: payload.email, role: payload.role })
      };
    } catch {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid refresh token");
    }
  }
};
