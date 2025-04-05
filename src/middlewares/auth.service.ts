import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioModel } from '../models/usuario.model';

dotenv.config();

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
  private static readonly SALT_ROUNDS = 10;
  private static readonly TOKEN_EXPIRATION = '8h';

  static async login(usuario: string, senha: string) {
    const user = await UsuarioModel.getByUsuario(usuario);
    
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    const { senha: _, ...userWithoutPassword } = user;

    return {
      token: jwt.sign(
        userWithoutPassword,
        AuthService.JWT_SECRET,
        { expiresIn: AuthService.TOKEN_EXPIRATION }
      ),
      user: userWithoutPassword
    };
  }

  static async register(userData: Usuario) {
    if (await UsuarioModel.getByUsuario(userData.usuario)) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(
      userData.senha, 
      AuthService.SALT_ROUNDS
    );
    
    return await UsuarioModel.create({
      ...userData,
      senha: hashedPassword
    });
  }


  static async verifyToken(token: string) {
    try {
      return jwt.verify(token, AuthService.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}