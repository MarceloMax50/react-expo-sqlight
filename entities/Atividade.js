export class Atividade {
    constructor(id, descricao, tipo, local, dataEntrega, horaEntrega, status) {
        this.id = id;
        this.descricao = descricao;
        this.tipo = tipo;
        this.local = local;
        this.dataEntrega = dataEntrega;
        this.horaEntrega = horaEntrega;
        this.status = status;
    };
}

export default Atividade;
