export class Gravador {
    gravar(historico) {
        const historicoString = JSON.stringify(historico);
        localStorage.setItem('historico', historicoString);
    }
    obterHistorico() {
        var _a;
        const historicoString = (_a = localStorage.getItem('historico')) !== null && _a !== void 0 ? _a : '[0,0,0,0,0,0]';
        const historico = JSON.parse(historicoString);
        return historico;
    }
}
//# sourceMappingURL=gravadorHistorico.js.map