import React, { useState } from "react";
//import Botao from "./components/botao";
import Formulario from "../components/formulario";
import Lista from "../components/lista";
import style from "./App.module.scss";
import Cronometro from "../components/cronometro";
import { ITarefa } from "../types/tarefa";
function App() {
  const [tarefas, setTarefas] = useState<ITarefa[] | []>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();

  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa: any) => ({
        ...tarefa,
        selecionado: tarefa.id === tarefaSelecionada.id ? true : false,
      }))
    );
  }

  function finalizarTarefa() {
    if (selecionado) {
      setSelecionado(undefined);
      setTarefas((tarefasAnteriores) =>
        tarefasAnteriores.map((tarefa) => {
          if (tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true,
            };
          }
          return tarefa;
        })
      );
    }
  }
  return (
    <div className={style.AppStyle}>
      <header className={style.AppBody}>
        <div>
          <Formulario setTarefas={setTarefas} />{" "}
          <Cronometro selecionado={selecionado} finalizarTarefa={finalizarTarefa}/>
        </div>
        <div>
          <Lista tarefas={tarefas} selecionaTarefa={selecionaTarefa}></Lista>
        </div>
      </header>
    </div>
  );
}

export default App;
