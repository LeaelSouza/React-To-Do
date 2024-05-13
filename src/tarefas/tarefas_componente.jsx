import { useRef, useState, useEffect } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [edicaoAtiva, setEdicaoAtiva] = useState(null); // Armazena o índice da tarefa em edição
    const descricaoTarefaInputRef = useRef();

    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefa")) || [];
        setListaTarefas(tarefasSalvas);
    }, []);

    function adicionaTarefa() {
        const novaTarefa = {
            descricao: descricaoTarefaInputRef.current.value,
            finalizado: false
        };
        setListaTarefas([...listaTarefas, novaTarefa]);
        localStorageCadastro([...listaTarefas, novaTarefa]);
        descricaoTarefaInputRef.current.value = ""; // Limpa o input
    }

    function deletarTarefa(index) {
        setListaTarefas(prevTarefas => {
            const novasTarefas = prevTarefas.filter((_, i) => i !== index);
            localStorageCadastro(novasTarefas);
            return novasTarefas;
        });
        window.location.reload();  
    }

    function editarTarefa(index, novaDescricao) {
        const novasTarefas = listaTarefas.map((tarefa, i) => {
            if (i === index) {
                return { ...tarefa, descricao: novaDescricao };
            }
            return tarefa;
        });
        setListaTarefas(novasTarefas);
        localStorageCadastro(novasTarefas);
        setEdicaoAtiva(null); // Finaliza a edição
    }

    function handleKeyPress(event, index) {
        if (event.key === "Enter") {
            editarTarefa(index, event.target.value);
        }
    }

    function marcarComoConcluida(index) {
        const novasTarefas = listaTarefas.map((tarefa, i) => {
            if (i === index) {
                return { ...tarefa, finalizado: !tarefa.finalizado }; // Alterna o estado finalizado
            }
            return tarefa;
        });
        setListaTarefas(novasTarefas);
        localStorageCadastro(novasTarefas);
    }

    function localStorageCadastro(tarefas) {
        localStorage.setItem("tarefa", JSON.stringify(tarefas));
    }

    function pegaEstilo(TarefaAtual) {
        return TarefaAtual.finalizado ? 'line-through' : 'none';
    }

    return (
        <>
            <input placeholder="Digite a tarefa" type="text" ref={descricaoTarefaInputRef} />
            <button onClick={adicionaTarefa}>Cadastrar</button>
            <br />
            <div>
                {listaTarefas.map((tarefa, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: "10px",
                        color: "White",
                        backgroundColor: 'Black',
                        textDecoration: pegaEstilo(tarefa),
                        padding: '5px',
                        position: 'relative', // Permite posicionamento absoluto dos botões
                    }} onClick={() => marcarComoConcluida(index)}> {/* Adiciona a função ao clicar na tarefa */}
                        <span style={{ position: 'absolute', right: '0', marginRight: '3px' }}>
                            <button
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: '3px',
                                    border: '1px solid white',
                                    marginRight: '3px', // Espaçamento entre os botões
                                }}
                                onClick={() => deletarTarefa(index)}
                            >
                                DELETAR
                            </button>
                            <button
                                style={{
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    padding: '3px',
                                    border: '1px solid white',
                                    marginRight: '3px', // Espaçamento entre os botões
                                }}
                                onClick={() => setEdicaoAtiva(index)}
                            >
                                EDITAR
                            </button>
                        </span>
                        {edicaoAtiva === index ? (
                            <input
                                type="text"
                                defaultValue={tarefa.descricao}
                                onKeyPress={(event) => handleKeyPress(event, index)}
                            />
                        ) : (
                            <span> {tarefa.descricao} </span>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Tarefas;