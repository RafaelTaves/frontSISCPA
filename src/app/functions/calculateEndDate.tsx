export default function calculateEndDate(dataInicio: string, duracaoMeses: number): string {
    const data = new Date(dataInicio);

    // Adiciona a duração em meses à data inicial
    data.setMonth(data.getMonth() + duracaoMeses);

    // Retorna a data de fim no formato 'YYYY-MM-DD'
    return data.toISOString().split('T')[0];
}

// Exemplo de uso:
// const dataInicio = '2025-03-10';
// const duracaoMeses = 6;
// const dataFim = calculateEndDate(dataInicio, duracaoMeses);
// console.log(dataFim); // Deve retornar '2025-09-10'
