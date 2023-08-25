export var resultadoEnum;
(function (resultadoEnum) {
    resultadoEnum[resultadoEnum["Acerto"] = 0] = "Acerto";
    resultadoEnum[resultadoEnum["Contido"] = 1] = "Contido";
    resultadoEnum[resultadoEnum["Erro"] = 2] = "Erro";
})(resultadoEnum || (resultadoEnum = {}));
export class Termo {
    constructor() {
        this.iniciarValores();
    }
    iniciarValores() {
        this.palavras = this.criarArrayPalavras();
        this.palavraSecreta =
            this.formatarPalavra(this.palavras[Math.floor(Math.random() * this.palavras.length)]).split('');
        this.letrasDescobertas = this.palavraSecreta.map(p => resultadoEnum.Erro);
        this.tentativas = 5;
        this.jogoAcabou = false;
        this.venceu = false;
        this.resultado = "";
    }
    fimDeJogo() {
        if (this.letrasDescobertas.filter(l => l != resultadoEnum.Acerto).length == 0) {
            this.tentativas++;
            this.venceu = true;
            this.jogoAcabou = true;
            this.resultado = "Você venceu!";
        }
        else if (this.tentativas == 0) {
            this.venceu = false;
            this.jogoAcabou = true;
            this.resultado = "Você perdeu! A palavra era " + this.palavraSecreta.join('').toUpperCase();
        }
        return this.jogoAcabou;
    }
    verificacaoPalavra(palavra) {
        palavra = palavra.toLowerCase();
        for (let i = 0; i < this.palavraSecreta.length; i++) {
            if (palavra[i] == this.palavraSecreta[i]) {
                this.letrasDescobertas[i] = resultadoEnum.Acerto;
            }
            else if (this.palavraSecreta.includes(palavra[i])) {
                this.letrasDescobertas[i] = resultadoEnum.Contido;
            }
            else {
                this.letrasDescobertas[i] = resultadoEnum.Erro;
            }
        }
        this.tentativas--;
        return this.letrasDescobertas;
    }
    criarArrayPalavras() {
        const palavras = [
            "ácido", "adiar", "ímpar", "algar", "amado", "amigo", "anexo", "anuir", "aonde", "apelo",
            "aquém", "argil", "arroz", "assar", "atrás", "ávido", "azeri", "babar", "bagre", "banho",
            "barco", "bicho", "bolor", "brasa", "brava", "brisa", "bruto", "bulir", "caixa", "cansa",
            "chato", "chave", "chefe", "choro", "chulo", "claro", "cobre", "corte", "curar", "deixo",
            "dizer", "dogma", "dores", "duque", "enfim", "estou", "exame", "falar", "fardo", "farto",
            "fatal", "feliz", "ficar", "fogue", "força", "forno", "fraco", "fugir", "fundo", "fúria",
            "gaita", "gasto", "geada", "gelar", "gosto", "grito", "gueto", "honra", "humor", "idade",
            "ideia", "ídolo", "igual", "imune", "índio", "íngua", "irado", "isola", "janta", "jovem",
            "juizo", "largo", "laser", "leite", "lento", "lerdo", "levar", "lidar", "lindo", "lírio",
            "longe", "luzes", "magro", "maior", "malte", "mamar", "manto", "marca", "matar", "meigo",
            "meios", "melão", "mesmo", "metro", "mimos", "moeda", "moita", "molho", "morno", "morro",
            "motim", "muito", "mural", "naipe", "nasci", "natal", "naval", "ninar", "nível", "nobre",
            "noite", "norte", "nuvem", "oeste", "ombro", "ordem", "órgão", "ósseo", "ossos", "outro",
            "ouvir", "palma", "pardo", "passe", "pátio", "peito", "pêlos", "perdo", "períl", "perto",
            "pezar", "piano", "picar", "pilar", "pingo", "pione", "pista", "poder", "porém", "prado",
            "prato", "prazo", "preço", "prima", "primo", "pular", "quero", "quota", "raiva", "rampa",
            "rango", "reais", "reino", "rezar", "risco", "roçar", "rosto", "roubo", "russo", "saber",
            "sacar", "salto", "samba", "santo", "selar", "selos", "senso", "serão", "serra", "servo",
            "sexta", "sinal", "sobra", "sobre", "sócio", "sorte", "subir", "sujei", "sujos", "talão",
            "talha", "tanga", "tarde", "tempo", "tenho", "terço", "terra", "tesão", "tocar", "lacre",
            "laico", "lamba", "lambo", "largo", "larva", "lasca", "laser", "laura", "lavra", "leigo",
            "leite", "leito", "leiva", "lenho", "lento", "leque", "lerdo", "lesão", "lesma", "levar",
            "libra", "limbo", "lindo", "líneo", "lírio", "lisar", "lista", "livro", "logar", "lombo",
            "lotes", "louca", "louco", "louro", "lugar", "luzes", "macio", "maçom", "maior", "malha",
            "malte", "mamar", "mamãe", "manto", "março", "maria", "marra", "marta", "matar", "medir",
            "meigo", "meios", "melão", "menta", "menti", "mesmo", "metro", "miado", "mídia", "mielo",
            "mielo", "milho", "mimos", "minar", "minha", "miolo", "mirar", "missa", "mitos", "moeda",
            "moído", "moita", "molde", "molho", "monar", "monja", "moral", "morar", "morda", "morfo",
            "morte", "mosca", "mosco", "motim", "motor", "mudar", "muito", "mular", "mulas", "múmia",
            "mural", "extra", "falar", "falta", "fardo", "farol", "farto", "fatal", "feixe", "festa",
            "feudo", "fezes", "fiapo", "fibra", "ficha", "fidel", "filão", "filho", "firma", "fisco",
            "fisga", "fluir", "força", "forma", "forte", "fraco", "frade", "friso", "frito", "fugaz",
            "fugir", "fundo", "furor", "furto", "fuzil", "gabar", "gaita", "galho", "ganho", "garoa",
            "garra", "garro", "garvo", "gasto", "gaupe", "gazua", "geada", "gemer", "germe", "gigas",
            "girar", "gizar", "globo", "gosto", "grãos", "graça", "grava", "grito", "grude", "haver",
            "haver", "hiato", "hidra", "hífen", "hímel", "horas", "hotel", "humor", "ideal", "ídolo",
            "igual", "ileso", "imune", "irado", "isola", "jarra", "jaula", "jegue", "jeito", "jogar",
            "jovem", "juíza", "juizo", "julho", "junho", "jurar", "justa"
        ];
        return palavras;
    }
    formatarPalavra(palavra) {
        let acentos = "ÄÅÁÂÀÃäáâàãÉÊËÈéêëèÍÎÏÌíîïìÖÓÔÒÕöóôòõÜÚÛüúûùÇç".split('');
        let formato = "AAAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUuuuuCc".split('');
        for (let i = 0; i < acentos.length; i++) {
            palavra = palavra.replace(acentos[i], formato[i]);
        }
        return palavra;
    }
    obterTentativas() {
        return this.tentativas;
    }
    obterResultado() {
        return this.resultado;
    }
}
//# sourceMappingURL=termo.js.map