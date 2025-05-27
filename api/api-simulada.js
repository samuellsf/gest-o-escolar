async function buscarEscola(nomeEscola) {
    if (!nomeEscola || typeof nomeEscola !== "string") {
        console.error("Erro: Nome da escola inválido.");
        return;
    }

    try {
        console.log(`🔍 Buscando informações sobre: ${nomeEscola}...`);
        const response = await fetch(`https://api.exemplo.com/escolas?nome=${encodeURIComponent(nomeEscola)}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const dados = await response.json();
        // Verifica se os dados retornados são válidos
        if (!Array.isArray(dados) || dados.length === 0) {
            throw new Error("Nenhum dado encontrado para a escola especificada.");
        }
        // Exibe os dados da escola no console
        console.log("✅ Dados recebidos com sucesso!"); 

        if (!dados || dados.length === 0) {
            console.warn("Nenhuma escola encontrada.");
        } else {
            console.log("📚 Dados da Escola:");
            console.table(dados); // Exibe os dados em tabela no console
        }

    } catch (error) {
        console.error("❌ Erro ao buscar a escola:", error.message);
    }
}

// Chamando a função com um nome de escola válido
buscarEscola("Escola Modelo");
