import { Gravador } from "./gravadorHistorico.js";
import { Termo, resultadoEnum } from "./termo.js";
class telaTermo {
    constructor() {
        this.pnlTermo = document.getElementById('pnlTermo');
        this.pnlTeclado = document.getElementById('pnlTeclado');
        this.btnEnter = document.getElementById('btnEnter');
        this.lbNotificacao = document.getElementById('lbNotificacao');
        this.trHistorico = document.getElementById('trHistorico');
        this.linha = 0;
        this.coluna = 0;
        this.termo = new Termo();
        this.botoesClicados = [];
        this.gravador = new Gravador();
        this.historico = this.gravador.obterHistorico();
        this.atualizarHistorico();
        this.registrarEventos();
        console.log(this.termo.palavraSecreta.join(''));
    }
    registrarEventos() {
        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b;
            if (botao.id != "btnEnter") {
                botao.addEventListener('click', (sender) => this.atualizarJogo(sender));
            }
        });
        this.btnEnter.addEventListener('click', () => this.avaliarPalavra());
    }
    atualizarJogo(sender) {
        const botao = sender.target;
        if (this.linha == 5) {
            return;
        }
        this.botoesClicados.push(botao);
        const lista = document.querySelectorAll(".letra");
        const letra = lista[this.coluna * 5 + this.linha];
        letra.textContent = botao.textContent;
        this.linha++;
    }
    avaliarPalavra() {
        if (this.termo.jogoAcabou) {
            this.resetarJogo();
            return;
        }
        if (this.linha != 5) {
            return;
        }
        let palavra = "";
        const lista = document.querySelectorAll(".letra");
        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            palavra += lista[i].textContent;
        }
        const resultado = this.termo.verificacaoPalavra(palavra);
        this.atualizarEstilo(resultado);
        this.coluna++;
        this.linha = 0;
        this.verificarResultado();
    }
    atualizarEstilo(resultado) {
        const lista = document.querySelectorAll(".letra");
        let j = 0;
        for (let i = this.coluna * 5; i < this.coluna * 5 + 5; i++) {
            const celula = lista[i];
            if (resultado[j] == resultadoEnum.Acerto) {
                celula.style.backgroundColor = "#22dd55";
            }
            else if (resultado[j] == resultadoEnum.Contido) {
                celula.style.backgroundColor = "#eded00";
            }
            else {
                celula.style.backgroundColor = "#5e5e5e";
                this.botoesClicados[j].disabled = true;
            }
            j++;
        }
        this.botoesClicados = [];
    }
    verificarResultado() {
        if (!this.termo.fimDeJogo()) {
            return;
        }
        const resultado = this.termo.obterResultado();
        this.lbNotificacao.style.display = "inline";
        this.lbNotificacao.textContent = resultado;
        if (this.termo.venceu) {
            this.lbNotificacao.className = "notificacao-acerto";
        }
        else {
            this.lbNotificacao.className = "notificacao-erro";
        }
        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b;
            if (botao.id != "btnEnter") {
                botao.disabled = true;
            }
        });
        this.gravarHistorico();
    }
    resetarJogo() {
        this.linha = 0;
        this.coluna = 0;
        this.termo.iniciarValores();
        this.pnlTeclado.childNodes.forEach(b => {
            const botao = b;
            botao.disabled = false;
        });
        const lista = document.querySelectorAll(".letra");
        for (let i = 0; i < lista.length; i++) {
            const celula = lista[i];
            celula.textContent = "";
            celula.style.backgroundColor = "#bebebe";
        }
        this.lbNotificacao.style.display = "none";
        this.botoesClicados = [];
        this.historico = this.gravador.obterHistorico();
        console.log(this.termo.palavraSecreta.join(''));
    }
    gravarHistorico() {
        this.historico[5 - this.termo.obterTentativas()]++;
        this.gravador.gravar(this.historico);
        this.atualizarHistorico();
    }
    atualizarHistorico() {
        const lista = this.trHistorico.children;
        for (let i = 0; i < lista.length; i++) {
            lista[i].textContent = "" + this.historico[i];
        }
    }
}
window.addEventListener('load', () => new telaTermo());
//# sourceMappingURL=tela-termo.js.map