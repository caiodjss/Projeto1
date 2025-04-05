/**
 * @swagger
 * components:
 *   schemas:
 *     Docente:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do docente
 *         nome:
 *           type: string
 *           description: Nome completo do docente
 *         area:
 *           type: string
 *           description: Área de atuação do docente
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do docente
 *         telefone:
 *           type: string
 *           description: Telefone do docente
 *       example:
 *         id: 1
 *         nome: João Silva
 *         area: Informática
 *         email: joao@escola.com
 *         telefone: (11) 99999-9999
 */
export interface Docente {
    id?: number;
    nome: string;
    area?: string;
    email?: string;
    telefone?: string;
}