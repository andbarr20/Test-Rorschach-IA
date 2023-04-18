import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/imagen10.jpg"/>
      </Head>

      <main className={styles.main}>
        <h1>TEST RORSCHACH</h1>
        <h2>Imagen 10</h2>
        <img src="/imagen10.jpg" className={styles.icon} />
        <div>
          <p>La técnica de Rorschach se utiliza principalmente para evaluar la personalidad. Consiste en una serie de 10 láminas que presentan manchas de tinta, las cuales se caracterizan por su ambigüedad y falta de estructuración.</p>
          <p>A continuación va a aprecer una de las 10 imagenes del text de Rorscharch, veala con detenimiento y en el recuadro que aparece describa lo que ve en la imagen de la manera mas detallada posible, recuerde tambien hacer una interpretación de los colores que ve.</p>
          <p>Despues de realizar la descripcion, por favor de clic en generar analisis, esto con el fin de que el sistema tome su respuesta y genere un analisis de su personalidad.</p>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Escriba su descripción"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generar Analisis" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
