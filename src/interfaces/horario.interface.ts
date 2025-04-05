export interface Horario {
    id?: number;
    docente_id: number;
    turma_id: number;
    dia_semana: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
    hora_inicio: string;
    hora_fim: string;
}