// gerar os campos com o número da ordem escolhida
function gerarMatriz() {
    const ordem = parseInt(document.getElementById('ordem').value);
    const container = document.getElementById('matrixInputs');
    container.innerHTML = '';

// cria a matriz com os valores definidos
    for (let i = 0; i < ordem; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('matrix-row');
        for (let j = 0; j < ordem; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `cell-${i}-${j}`;
            rowDiv.appendChild(input);
        }
        container.appendChild(rowDiv);
    }
}

// coleta os valores inseridos :)
function coletarMatriz() {
    const ordem = parseInt(document.getElementById('ordem').value);
    const matriz = [];

    for (let i = 0; i < ordem; i++) {
        const linha = [];
        for (let j = 0; j < ordem; j++) {
            const valor = parseFloat(document.getElementById(`cell-${i}-${j}`).value);
            if (isNaN(valor)) {
                // se o usuário não preencher tudo certinho
                throw new Error(`Valor inválido na posição (${i+1}, ${j+1}).`);
            }
            linha.push(valor);
        }
        matriz.push(linha);
    }

    return matriz;
}
// calcula o determinante
function determinante(matriz) {
    const n = matriz.length;

    // se o usuário colocar ordem 1 ou 2
    if (n === 1) return matriz[0][0];
    if (n === 2) return matriz[0][0]*matriz[1][1] - matriz[0][1]*matriz[1][0];

    let det = 0;
    // expansão de Laplace
    for (let k = 0; k < n; k++) {
        // cria submatriz excluindo a linha 0 e coluna k
        const subMatriz = matriz.slice(1).map(row => row.filter((_, j) => j !== k));
        det += ((k % 2 === 0 ? 1 : -1) * matriz[0][k] * determinante(subMatriz));
    }
    return det;
}

// verifica se é LI ou LD
function verificarMatriz() {
    try {
        const matriz = coletarMatriz();
        const det = determinante(matriz);
        let resultado = `Determinante: ${det}<br>`;

        if (det !== 0) {
            resultado += '😀 A matriz é Linearmente Independente (LI).';
        } else {
            resultado += '😀 A matriz é Linearmente Dependente (LD).';
        }

        document.getElementById('resultado').innerHTML = resultado;
    } catch (error) {
        document.getElementById('resultado').innerHTML = '❗ Erro: ' + error.message;
    }
}

// gostei muito de fazer isso aqui, teacher Flausino 😁