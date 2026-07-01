"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function RagMcpContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        RAG con MCP: recuperación de información para tu IA
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Aprende a construir un pipeline de Retrieval Augmented Generation usando
        servidores MCP como fuente de datos, memoria y contexto. Tu IA dejará de
        alucinar y empezará a responder con información real.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Qué es RAG?</BlogH2>
      <BlogP>
        <strong>Retrieval Augmented Generation (RAG)</strong> es una
        arquitectura que combina recuperación de información con generación de
        texto. En lugar de que un modelo de lenguaje responda únicamente desde
        su conocimiento interno (con fecha de corte y propenso a alucinaciones),
        RAG primero consulta una fuente externa — documentos, bases de datos,
        web — y luego genera la respuesta usando ese contexto recuperado.
      </BlogP>
      <BlogP>Un pipeline RAG típico tiene cuatro componentes:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Ingesta</strong> — leer documentos fuente y extraer su
          contenido
        </BlogLi>
        <BlogLi>
          <strong>Almacenamiento</strong> — guardar la información procesada en
          un formato recuperable
        </BlogLi>
        <BlogLi>
          <strong>Recuperación</strong> — buscar los fragmentos más relevantes
          para una consulta
        </BlogLi>
        <BlogLi>
          <strong>Generación</strong> — el modelo de lenguaje responde usando el
          contexto recuperado
        </BlogLi>
      </BlogUl>
      <BlogP>
        MCP encaja de forma natural aquí: cada fase del pipeline puede ser
        cubierta por uno o varios servidores MCP, sin necesidad de
        infraestructura adicional.
      </BlogP>

      <BlogH2>Componentes RAG como MCPs</BlogH2>
      <BlogP>
        El ecosistema MCP incluye servidores que cubren cada etapa del pipeline
        RAG. Estos son los más relevantes:
      </BlogP>

      <BlogH3>Filesystem MCP</BlogH3>
      <BlogP>
        El servidor <code>@modelcontextprotocol/server-filesystem</code> expone
        herramientas para leer archivos del disco. Es tu puerta de entrada para
        la ingesta: documentación técnica, manuales, archivos markdown, código
        fuente. Con tools como <code>read_file</code>,{" "}
        <code>list_directory</code> y <code>search_files</code>, la IA puede
        explorar y extraer contenido de cualquier carpeta del proyecto.
      </BlogP>

      <BlogH3>Fetch MCP</BlogH3>
      <BlogP>
        El servidor <code>@modelcontextprotocol/server-fetch</code> permite a la
        IA descargar contenido web. Ideal para traer documentación online,
        artículos, o APIs públicas. La herramienta <code>fetch</code> recibe una
        URL y devuelve el contenido en texto plano, listo para ser procesado.
      </BlogP>

      <BlogH3>Memory MCP</BlogH3>
      <BlogP>
        El servidor <code>@modelcontextprotocol/server-memory</code> proporciona
        una base de conocimiento persistente basada en grafos de entidades. Con
        tools como <code>add_knowledge</code>, <code>search_knowledge</code> y{" "}
        <code>get_related_knowledge</code>, la IA puede almacenar hechos,
        conceptos y relaciones entre sesiones. Es el equivalente a una memoria
        vectorial ligera, pero sin necesidad de embeddings ni bases de datos
        especializadas.
      </BlogP>

      <BlogH3>Servidores de vectores (opcional)</BlogH3>
      <BlogP>
        Para búsqueda semántica a gran escala, existen servidores MCP que se
        conectan a bases de datos vectoriales como Supabase (pgvector), Pinecone
        o Weaviate. No son parte del estándar MCP, pero la comunidad los ha
        implementado como wrappers. Si tu volumen de documentos supera unos
        pocos megabytes, vale la pena considerar esta opción.
      </BlogP>

      <BlogH2>Pipeline de ingesta</BlogH2>
      <BlogP>
        La ingesta es el proceso de leer documentos y convertirlos en
        conocimiento estructurado que la IA pueda recuperar después. Con MCP,
        este pipeline se ejecuta dentro de la conversación:
      </BlogP>

      <BlogH3>1. Leer documentos con Filesystem MCP</BlogH3>
      <BlogP>
        La IA usa <code>list_directory</code> para explorar la carpeta de
        documentos y <code>read_file</code> para leer cada archivo relevante.
        Puede filtrar por extensión, nombre o contenido con{" "}
        <code>search_files</code>.
      </BlogP>
      <BlogCode>{`// La IA ejecuta internamente algo como:
list_directory("./docs/api/")
→ ["endpoints.md", "auth.md", "errors.md"]

read_file("./docs/api/endpoints.md")
→ "# Endpoints\\n## GET /users\\n..."`}</BlogCode>

      <BlogH3>2. Extraer chunks relevantes</BlogH3>
      <BlogP>
        La IA analiza el contenido y extrae fragmentos significativos:
        definiciones de endpoints, descripciones de parámetros, ejemplos de uso.
        Cada fragmento debe ser atómico — una idea por chunk — para que la
        recuperación sea precisa.
      </BlogP>

      <BlogH3>3. Almacenar en Memory MCP</BlogH3>
      <BlogP>
        Cada fragmento se guarda como un nodo de conocimiento con{" "}
        <code>add_knowledge</code>. Puedes incluir metadatos como la fuente, el
        tipo de información o tags para facilitar el filtrado posterior.
      </BlogP>
      <BlogCode>{`// Cada chunk se convierte en un nodo de conocimiento
add_knowledge({
  fact: "GET /users devuelve la lista de usuarios paginada",
  source: "./docs/api/endpoints.md",
  tags: ["endpoint", "users", "GET"]
})`}</BlogCode>

      <BlogCallout type="tip">
        La ingesta no tiene que ser masiva. Puedes hacerla incremental: a medida
        que la IA necesita información de un archivo, lo lee, lo procesa y lo
        guarda. Esto reduce costes de tokens y evita procesar documentos que
        nunca se consultan.
      </BlogCallout>

      <BlogH2>Pipeline de consulta</BlogH2>
      <BlogP>
        Cuando un usuario hace una pregunta, la IA sigue este flujo:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>1. Interpretar</strong> — la IA analiza la pregunta y extrae
          términos clave
        </BlogLi>
        <BlogLi>
          <strong>2. Buscar en memoria</strong> — usa{" "}
          <code>search_knowledge</code> en Memory MCP para encontrar hechos
          relevantes
        </BlogLi>
        <BlogLi>
          <strong>3. Complementar</strong> — si la memoria no tiene suficiente
          contexto, lee archivos directamente con Filesystem MCP o fetch
        </BlogLi>
        <BlogLi>
          <strong>4. Combinar</strong> — integra el contexto recuperado con la
          pregunta original
        </BlogLi>
        <BlogLi>
          <strong>5. Responder</strong> — genera la respuesta citando las
          fuentes
        </BlogLi>
      </BlogUl>
      <BlogP>
        La clave de RAG con MCP es que la recuperación y la generación ocurren
        en el mismo turno de conversación. No hay un sistema externo de
        embeddings ni una base de datos vectorial intermedia — todo vive en los
        servidores MCP que el asistente ya tiene configurados.
      </BlogP>

      <BlogH2>Ejemplo práctico: asistente de documentación</BlogH2>
      <BlogP>
        Vamos a montar un asistente que analiza la documentación de una API y
        responde preguntas sobre sus endpoints. Solo necesitas dos servidores
        MCP.
      </BlogP>

      <BlogH3>Configurar Filesystem MCP</BlogH3>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"]
    }
  }
}`}</BlogCode>

      <BlogH3>Configurar Memory MCP</BlogH3>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": { ... },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}`}</BlogCode>

      <BlogH3>Workflow</BlogH3>
      <BlogP>Una vez configurados, puedes pedirle a la IA:</BlogP>
      <BlogCode>{`"Analiza la documentación de mi API en ./docs y responde preguntas sobre los endpoints."`}</BlogCode>
      <BlogP>La IA hará lo siguiente automáticamente:</BlogP>
      <BlogUl>
        <BlogLi>
          Explorará <code>./docs</code> con <code>list_directory</code>
        </BlogLi>
        <BlogLi>
          Leerá cada archivo markdown con <code>read_file</code>
        </BlogLi>
        <BlogLi>
          Extraerá hechos (endpoints, parámetros, ejemplos) y los guardará con{" "}
          <code>add_knowledge</code>
        </BlogLi>
        <BlogLi>
          En consultas futuras, usará <code>search_knowledge</code> para
          recuperar el contexto antes de responder
        </BlogLi>
      </BlogUl>
      <BlogP>Por ejemplo, tras la ingesta puedes preguntar:</BlogP>
      <BlogCode>{`"¿Qué parámetros acepta el endpoint POST /users?"`}</BlogCode>
      <BlogP>
        La IA buscará en su memoria MCP, encontrará el chunk relevante y te
        responderá con la información exacta de la documentación, incluyendo la
        fuente.
      </BlogP>

      <BlogCallout type="info">
        La memoria MCP persiste entre sesiones. Una vez hecha la ingesta, el
        conocimiento está disponible aunque cierres y vuelvas a abrir el
        asistente. Esto convierte a MCP en una base de conocimiento permanente
        para tu equipo.
      </BlogCallout>

      <BlogH2>Estrategias avanzadas</BlogH2>

      <BlogH3>Chunking semántico vs por tokens</BlogH3>
      <BlogP>
        El chunking determina cómo divides los documentos en fragmentos
        recuperables. El enfoque <strong>por tokens</strong> corta cada N
        tokens, es simple pero puede partir una idea por la mitad. El{" "}
        <strong>chunking semántico</strong> respeta los límites naturales del
        contenido: párrafos, secciones, bloques de código. Memory MCP funciona
        mejor con chunks semánticos porque cada nodo de conocimiento representa
        un hecho completo y coherente.
      </BlogP>

      <BlogH3>Metadata tagging para filtrado</BlogH3>
      <BlogP>
        Cuando almacenas conocimiento en Memory MCP, los tags son tu herramienta
        de filtrado más potente. Puedes etiquetar chunks por:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Tipo de información:</strong> "endpoint", "schema", "ejemplo",
          "error"
        </BlogLi>
        <BlogLi>
          <strong>Módulo o área:</strong> "auth", "payments", "users"
        </BlogLi>
        <BlogLi>
          <strong>Prioridad o versión:</strong> "v2", "deprecated", "critical"
        </BlogLi>
      </BlogUl>
      <BlogP>
        Cuando la IA busca, puede incluir tags en la consulta para acotar los
        resultados y mejorar la precisión.
      </BlogP>

      <BlogH3>Actualización incremental de memoria</BlogH3>
      <BlogP>
        La documentación cambia. Con MCP puedes mantener la memoria actualizada
        sin re-ingestar todo: la IA lee solo los archivos modificados, elimina
        los nodos de conocimiento obsoletos y añade los nuevos. Puedes incluso
        pedirle una rutina de verificación periódica.
      </BlogP>

      <BlogH2>Limitaciones</BlogH2>
      <BlogP>
        RAG con MCP es poderoso para equipos pequeños y documentación técnica,
        pero tiene limitaciones que conviene conocer:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Ventana de contexto del modelo</strong> — aunque Memory MCP
          almacena muchos hechos, la IA solo puede recuperar unos pocos en cada
          consulta. El límite es la ventana de contexto del modelo que estés
          usando.
        </BlogLi>
        <BlogLi>
          <strong>Coste de tokens en ingesta grande</strong> — si tu
          documentación tiene cientos de archivos, la ingesta inicial puede
          consumir muchos tokens. Planifica la ingesta incremental para mitigar
          este coste.
        </BlogLi>
        <BlogLi>
          <strong>Sin base de datos vectorial nativa en MCP estándar</strong> —
          Memory MCP usa búsqueda por palabras clave y relaciones, no
          embeddings. Para búsqueda semántica a escala necesitarás un servidor
          de vectores externo o una base de datos como Supabase con pgvector.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="done">
        RAG con MCP te permite construir un asistente informado sobre tu propia
        base de conocimiento sin necesidad de infraestructura compleja. Con
        Filesystem MCP para leer documentos, Fetch MCP para contenido web y
        Memory MCP como cerebro persistente, tu IA puede responder con precisión
        sobre cualquier tema del que tengas documentación escrita.
      </BlogCallout>
    </article>
  );
}
