import {useRef, useState } from "react";

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    
    const descricaoTarefaInputRef = useRef();


    //Arrowfunction
    function adicionaTarefa() {
        console.log(descricaoTarefaInputRef.current.value);
        
        listaTarefas.push(
            {
                descricao: descricaoTarefaInputRef.current.value,
                finalizado: false
            }
        );

        setListaTarefas(listaTarefas.slice());
        console.log('Cadastrado');
    }

    //Adicionando tarefas ao localStorage
    localStorage.setItem('Tarefas', JSON.stringify(listaTarefas));
    console.log(listaTarefas);

    //Recuperando valor do localStorage
    var usuario_localStorage = localStorage.getItem("tarefas");

    function atualizarTarefa(tarefaAtual) {
        setListaTarefas(listaTarefas.slice());
        // Jeito simplificado de fazer
        tarefaAtual.finalizado = !tarefaAtual.finalizado;
        dsad

    }

    function pegaEstilo(tarefaAtual){
        if(tarefaAtual.finalizado){
            return 'line-through';
        }
        return 'none';
    }

    return (
        <div>
        <input type="text" ref={descricaoTarefaInputRef}/>
            <button onClick={adicionaTarefa}>Cadastrar</button>
            <br />
            <div>
                {
                    listaTarefas.map(tarefaAtual => {
                        return <h2 style={
                            {
                                margin: '10px',
                                color: 'blue',
                                backgroundColor: 'Black',
                                textDecoration: pegaEstilo(tarefaAtual)
                            }
                            
                        } onClick={() => atualizarTarefa(tarefaAtual)}>{tarefaAtual.descricao}</h2>
                    })
                    
                }
            </div>
        </div>
    );
}

export default Tarefas;