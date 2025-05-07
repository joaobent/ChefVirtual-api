async function executaQuery(conexao, query, params = []){
    const [resultado] = await conexao.query(query, params)
    return resultado
}

export { executaQuery }