export class Gravador {

    gravar(historico: number[]): void {
        const historicoString = JSON.stringify(historico);

        localStorage.setItem('historico', historicoString);
    }

    obterHistorico(): number[] {
    const historicoString = localStorage.getItem('historico') ?? '[0,0,0,0,0,0]';

    const historico: number[] = JSON.parse(historicoString);
    return historico;
    }
}