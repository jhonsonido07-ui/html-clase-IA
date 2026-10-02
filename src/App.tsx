/*
  Boceto de la interfaz (Paso 1)

  ┌─────────────────────────────────────┐
  │ Fila creativa                       │
  │ [Nombre         ] [Motivo        ]  │
  │ [Agregar turno]                     │
  ├─────────────────────────────────────┤
  │ Siguiente: Lina                     │
  │ Motivo: Pregunta sobre React         │
  │ [Atender siguiente]                  │
  ├─────────────────────────────────────┤
  │ En espera                            │
  │ 1. Lina - Pregunta sobre React       │
  │ 2. Tomás - Error de instalación      │
  └─────────────────────────────────────┘
*/

import { useState } from "react";

type Turno = {
  id: string;
  nombre: string;
  motivo: string;
  prioridad: "normal" | "urgente";
};

const turnosIniciales: Turno[] = [
  { id: "t-1", nombre: "Tomás", motivo: "Error de instalación", prioridad: "urgente" },
  { id: "t-2", nombre: "Lina", motivo: "Pregunta sobre React", prioridad: "normal" },
];

function App() {
  const [turnos, setTurnos] = useState<Turno[]>(turnosIniciales);
  const [historial, setHistorial] = useState<Turno[]>([]);
  const [nombre, setNombre] = useState("");
  const [motivo, setMotivo] = useState("");
  const [prioridad, setPrioridad] = useState<"normal" | "urgente">("normal");

  function agregarTurno() {
    const nombreLimpio = nombre.trim();
    const motivoLimpio = motivo.trim();

    if (!nombreLimpio || !motivoLimpio) {
      return;
    }

    const nuevoTurno: Turno = {
      id: crypto.randomUUID(),
      nombre: nombreLimpio,
      motivo: motivoLimpio,
      prioridad: prioridad,
    };

    setTurnos((filaActual) => {
      if (nuevoTurno.prioridad === "urgente") {
        const urgentes = filaActual.filter((turno) => turno.prioridad === "urgente");
        const normales = filaActual.filter((turno) => turno.prioridad !== "urgente");
        return [...urgentes, nuevoTurno, ...normales];
      }
      return [...filaActual, nuevoTurno];
    });
    setNombre("");
    setMotivo("");
    setPrioridad("normal");
  }

  function atenderSiguiente() {
    if (turnos.length === 0) {
      return;
    }

    const atendido = turnos[0];
    setTurnos((filaActual) => filaActual.slice(1));
    setHistorial((historialActual) => [...historialActual, atendido]);
  }

  function restaurarUltimo() {
    if (historial.length === 0) {
      return;
    }

    const ultimoAtendido = historial[historial.length - 1];
    setHistorial((historialActual) => historialActual.slice(0, -1));
    setTurnos((filaActual) => [ultimoAtendido, ...filaActual]);
  }

  const siguienteTurno = turnos[0];

  return (
    <main className="estacion">
      <h1>🚀 Fila creativa</h1>
      <p className="subtitulo">Sala de espera espacial</p>

      <form
        className="formulario"
        onSubmit={(evento) => {
          evento.preventDefault();
          agregarTurno();
        }}
      >
        <label>
          Nombre
          <input value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
        </label>

        <label>
          Motivo
          <input value={motivo} onChange={(evento) => setMotivo(evento.target.value)} />
        </label>

        <label>
          Prioridad
          <select value={prioridad} onChange={(evento) => setPrioridad(evento.target.value as "normal" | "urgente")}>
            <option value="normal">Normal</option>
            <option value="urgente">Urgente</option>
          </select>
        </label>

        <button type="submit">Agregar turno</button>
      </form>

      {siguienteTurno ? (
        <section className="siguiente">
          <h2>🛰️ Siguiente en abordar</h2>
          <p className="nombre">{siguienteTurno.nombre}</p>
          <p className="motivo">{siguienteTurno.motivo}</p>
          <p className={siguienteTurno.prioridad === "urgente" ? "etiqueta urgente" : "etiqueta normal"}>
            {siguienteTurno.prioridad === "urgente" ? "URGENTE" : "NORMAL"}
          </p>
          <button onClick={atenderSiguiente}>Atender siguiente</button>
        </section>
      ) : (
        <section className="vacio">
          <p>🛸 No hay personas en espera.</p>
        </section>
      )}

      <section className="lista">
        <h2>👨‍🚀 En espera</h2>
        <ol>
          {turnos.map((turno, posicion) => (
            <li key={turno.id}>
              <span className="posicion">{posicion + 1}.</span>{" "}
              <span className="nombre-lista">{turno.nombre}</span> - {turno.motivo}{" "}
              <span className={turno.prioridad === "urgente" ? "etiqueta urgente" : "etiqueta normal"}>
                {turno.prioridad === "urgente" ? "URGENTE" : "NORMAL"}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {historial.length > 0 ? (
        <section className="historial">
          <h2>📋 Historial</h2>
          <p>Ultimo atendido: {historial[historial.length - 1].nombre}</p>
          <button onClick={restaurarUltimo}>Restaurar ultimo</button>
        </section>
      ) : null}
    </main>
  );
}

export default App;