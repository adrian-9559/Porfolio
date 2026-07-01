"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogInlineCode,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function AgentFrameworksContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
          Artículo
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          12 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Frameworks de agentes de IA: LangChain, CrewAI, OpenAI Agents SDK y más
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Comparativa práctica de los principales frameworks para construir
        agentes de IA. LangChain, CrewAI, OpenAI Agents SDK, Anthropic Claude
        Agent, AutoGPT y Phidata — cuándo usar cada uno, con ejemplos mínimos de
        código.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Cuándo usar un framework?</BlogH2>
      <BlogP>
        Usar un LLM directamente (vía API) es perfecto para tareas sencillas: un
        chat, una respuesta única, una clasificación. Pero en cuanto necesitas
        encadenar múltiples pasos, darle herramientas al modelo, orquestar
        sub-agentes o mantener estado a lo largo de una conversación, un
        framework te ahorra cientos de líneas de código repetitivo.
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Sin framework</strong>: llamas a la API, parseas la respuesta,
          gestionas el historial manualmente. Simple pero escalable solo hasta
          cierto punto.
        </BlogLi>
        <BlogLi>
          <strong>Con framework</strong>: declaras herramientas, el framework
          gestiona el loop de llamadas, el enrutamiento entre agentes y la
          memoria. Más abstracción, menos control granular.
        </BlogLi>
      </BlogUl>
      <BlogP>
        La decisión no es binaria. Puedes empezar con raw API y migrar a un
        framework cuando el código se vuelva repetitivo. La clave está en elegir
        el framework que se alinee con tu modelo mental del problema.
      </BlogP>

      <BlogH2>Tabla comparativa</BlogH2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-black/8 dark:border-white/8">
              <th className="text-left font-semibold text-[#1d1d1f] dark:text-white py-2 pr-3">
                Framework
              </th>
              <th className="text-left font-semibold text-[#1d1d1f] dark:text-white py-2 pr-3">
                Lenguaje
              </th>
              <th className="text-left font-semibold text-[#1d1d1f] dark:text-white py-2 pr-3">
                Enfoque
              </th>
              <th className="text-left font-semibold text-[#1d1d1f] dark:text-white py-2 pr-3">
                Soporte MCP
              </th>
              <th className="text-left font-semibold text-[#1d1d1f] dark:text-white py-2 pr-3">
                Curva
              </th>
              <th className="text-left font-semibold text-[#1d1d1f] dark:text-white py-2">
                Ideal para
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black/6 dark:border-white/6">
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                LangChain / LangGraph
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                TS + Py
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Grafo de estado
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Plugin
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Alta
              </td>
              <td className="py-2 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Apps complejas con estado
              </td>
            </tr>
            <tr className="border-b border-black/6 dark:border-white/6">
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                CrewAI
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Py
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Multi-agente roles
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                No
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Media
              </td>
              <td className="py-2 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Equipos de agentes
              </td>
            </tr>
            <tr className="border-b border-black/6 dark:border-white/6">
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                OpenAI Agents SDK
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Py
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Tool calling nativo
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Sí
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Baja
              </td>
              <td className="py-2 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Chatbots y asistentes
              </td>
            </tr>
            <tr className="border-b border-black/6 dark:border-white/6">
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Anthropic Claude Agent
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                TS + Py
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                MCP-first
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Nativo
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Baja
              </td>
              <td className="py-2 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Asistentes con herramientas
              </td>
            </tr>
            <tr className="border-b border-black/6 dark:border-white/6">
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                AutoGPT
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Py
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Autónomo
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                No
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Alta
              </td>
              <td className="py-2 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Automatización larga duración
              </td>
            </tr>
            <tr className="border-b border-black/6 dark:border-white/6">
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Phidata
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Py
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                RAG integrado
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Plugin
              </td>
              <td className="py-2 pr-3 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Media
              </td>
              <td className="py-2 text-[#3a3a3c] dark:text-[#aeaeb2]">
                Agentes con conocimiento
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlogH2>LangChain / LangGraph</BlogH2>
      <BlogP>
        LangChain es el framework más popular (y el más extenso). Su fortaleza
        está en la abstracción de cadenas (
        <BlogInlineCode>Chain</BlogInlineCode>) y la gestión de memoria.
        LangGraph, su extensión, modela el flujo del agente como un{" "}
        <strong>grafo de estado</strong>, donde cada nodo es un paso (LLM,
        herramienta, decisión) y las aristas definen las transiciones.
      </BlogP>
      <BlogP>
        Ejemplo mínimo: un agente que consulta el clima usando una herramienta:
      </BlogP>
      <BlogCode>{`from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_community.tools import tool
from langchain_openai import ChatOpenAI

@tool
def get_weather(city: str) -> str:
    return f"23°C, soleado en {city}"

tools = [get_weather]
agent = create_tool_calling_agent(ChatOpenAI(model="gpt-4o"), tools)
executor = AgentExecutor(agent=agent, tools=tools)
result = executor.invoke({"input": "¿Qué clima hace en Madrid?"})
print(result["output"])`}</BlogCode>
      <BlogP>
        Con LangGraph puedes controlar el flujo explícitamente: decides cuándo
        el agente itera, cuándo termina, y cómo se propaga el estado entre
        nodos. Es ideal para workflows predecibles como atención al cliente o
        procesamiento de documentos.
      </BlogP>

      <BlogH2>CrewAI</BlogH2>
      <BlogP>
        CrewAI modela equipos de agentes con roles especializados. Cada agente
        tiene un rol, un objetivo y herramientas. El framework orquesta la
        comunicación entre ellos para resolver tareas complejas.
      </BlogP>
      <BlogP>Ejemplo: dos agentes (investigador y escritor) colaborando:</BlogP>
      <BlogCode>{`from crewai import Agent, Task, Crew

researcher = Agent(role="Investigador", goal="Buscar datos sobre IA",
    backstory="Experto en tendencias tecnológicas", verbose=True)

writer = Agent(role="Redactor", goal="Escribir informe claro",
    backstory="Periodista científico", verbose=True)

research = Task(description="Encuentra 3 innovaciones de IA en 2026",
    agent=researcher, expected_output="lista")
write = Task(description="Redacta un resumen ejecutivo",
    agent=writer, expected_output="texto")

crew = Crew(agents=[researcher, writer], tasks=[research, write])
result = crew.kickoff()
print(result)`}</BlogCode>
      <BlogP>
        CrewAI brilla cuando tu problema se modela naturalmente como
        colaboración entre roles distintos: un analista, un validador y un
        sintetizador trabajando juntos.
      </BlogP>

      <BlogH2>OpenAI Agents SDK</BlogH2>
      <BlogP>
        Lanzado en 2025, el OpenAI Agents SDK es el reemplazo moderno de
        funciones. Simplifica drásticamente la creación de agentes con{" "}
        <strong>tool calling nativo</strong> y soporte para el protocolo MCP. No
        necesitas decoradores ni abstracciones complejas — defines funciones
        Python normales y el SDK las convierte en herramientas.
      </BlogP>
      <BlogCode>{`from agents import Agent, Runner, function_tool

@function_tool
def search_web(query: str) -> str:
    return f"Resultados simulados para: {query}"

agent = Agent(name="Buscador", instructions="Responde con datos actualizados",
    tools=[search_web])
result = Runner.run_sync(agent, "¿Quién ganó el mundial 2026?")
print(result.final_output)`}</BlogCode>
      <BlogP>
        El soporte MCP te permite conectar servidores MCP existentes
        directamente como herramientas del agente, sin código adicional. Es la
        opción más ligera para empezar si ya usas OpenAI como proveedor.
      </BlogP>

      <BlogH2>Anthropic Claude Agent</BlogH2>
      <BlogP>
        Anthropic ha apostado fuerte por MCP como estándar. Su SDK para agentes
        con Claude está diseñado <strong>MCP-first</strong>: las herramientas se
        definen como servidores MCP y el agente las descubre automáticamente. El
        mecanismo de <BlogInlineCode>tool use</BlogInlineCode> de Claude es
        inherente al modelo, no una capa externa.
      </BlogP>
      <BlogCode>{`import anthropic

client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=[{
        "name": "get_weather",
        "description": "Obtiene el clima de una ciudad",
        "input_schema": {
            "type": "object",
            "properties": {"city": {"type": "string"}}
        }
    }],
    messages=[{"role": "user", "content": "¿Clima en Barcelona?"}]
)
print(response.content)`}</BlogCode>
      <BlogP>
        Es la opción natural si trabajas con OpenCode, Claude Code o Cursor,
        pues todos comparten el ecosistema MCP de Anthropic. La curva de
        aprendizaje es la más baja del ecosistema.
      </BlogP>

      <BlogH2>AutoGPT / BabyAGI</BlogH2>
      <BlogP>
        AutoGPT popularizó la idea del agente autónomo: recibe un objetivo a
        largo plazo y ejecuta un loop de{" "}
        <em>pensar → actuar → observar → repetir</em> hasta completarlo. No está
        diseñado para tareas aisladas, sino para misiones que requieren
        múltiples iteraciones.
      </BlogP>
      <BlogP>Ejemplo conceptual del loop:</BlogP>
      <BlogCode>{`task = "Crear un informe de mercado semanal"
while not task_complete:
    thought = llm.invoke("¿Qué debo hacer ahora?")
    action = parse_action(thought)
    result = execute(action)
    memory.store(f"Paso {step}: {action} → {result}")
    task_complete = check_completion(task)`}</BlogCode>
      <BlogP>
        BabyAGI es una variante más ligera que se centra en la gestión dinámica
        de tareas: genera subtareas, las prioriza y las ejecuta en orden. Ambos
        son experimentales; útiles para prototipar automatización pero con
        resultados impredecibles en producción.
      </BlogP>

      <BlogH2>Matriz de decisión</BlogH2>
      <BlogP>Elegir framework se reduce a tu caso de uso concreto:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Chatbot simple</strong> → OpenAI Agents SDK o Anthropic Claude
          Agent (menos código, MCP listo)
        </BlogLi>
        <BlogLi>
          <strong>Workflow con estado</strong> → LangGraph (grafos, loops,
          control fino)
        </BlogLi>
        <BlogLi>
          <strong>Multi-agente colaborativo</strong> → CrewAI (roles,
          delegación, equipos)
        </BlogLi>
        <BlogLi>
          <strong>Agente con RAG / base de conocimiento</strong> → Phidata (RAG
          integrado, PostgreSQL vectorial)
        </BlogLi>
        <BlogLi>
          <strong>Automatización autónoma Larga duración</strong> → AutoGPT
          (experimental, ideal para prototipos)
        </BlogLi>
        <BlogLi>
          <strong>Ecosistema MCP</strong> → Anthropic Claude Agent (MCP nativo)
          u OpenAI Agents SDK (soporte vía protocolo)
        </BlogLi>
      </BlogUl>
      <BlogP>
        Ningún framework es universalmente superior. LangChain te da control
        total a cambio de complejidad; OpenAI Agents SDK prioriza simplicidad;
        CrewAI optimiza para colaboración; Anthropic apuesta por MCP. Evalúa tu
        prioridad — flexibilidad, velocidad de desarrollo, o ecosistema — y
        elige en consecuencia.
      </BlogP>

      <BlogCallout type="done">
        <strong>En resumen:</strong> LangChain/LangGraph es el todoterreno para
        apps complejas; CrewAI especialista en equipos de agentes; OpenAI Agents
        SDK la opción más directa para chatbots; Anthropic Claude Agent la
        puerta de entrada al ecosistema MCP; AutoGPT para experimentación
        autónoma; y Phidata para agentes con conocimiento integrado. No hay bala
        de plata: empieza con el que mejor se adapte a tu modelo de problema.
      </BlogCallout>
    </article>
  );
}
