export interface Usuario {
    id?: number;
    usuario: string;
    senha: string;
    nivel_acesso: 'professor' | 'coordenador';
    docente_id?: number;
    coordenador_id?: number;
}