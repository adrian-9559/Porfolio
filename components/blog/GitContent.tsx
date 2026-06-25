"use client";
import { useState } from "react";

type SectionId =
  | "intro" | "config" | "basico" | "ramas" | "remoto"
  | "conflictos" | "avanzado" | "flujos" | "referencia";

interface SectionDef { id: SectionId; label: string }
const SECTIONS: SectionDef[] = [
  { id: "intro",      label: "1. ¿Qué es Git?" },
  { id: "config",     label: "2. Configuración inicial" },
  { id: "basico",     label: "3. Comandos básicos" },
  { id: "ramas",      label: "4. Ramas (branches)" },
  { id: "remoto",     label: "5. Repositorios remotos" },
  { id: "conflictos", label: "6. Resolución de conflictos" },
  { id: "avanzado",   label: "7. Comandos avanzados" },
  { id: "flujos",     label: "8. Flujos de trabajo" },
  { id: "referencia", label: "9. Referencia rápida" },
];

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-4">
      <code className="text-[#e6edf3]">{children.trim()}</code>
    </pre>
  );
}
function Inline({ children }: { children: string }) {
  return <code className="bg-black/8 dark:bg-white/10 rounded px-1.5 py-0.5 text-xs font-mono text-[#1d1d1f] dark:text-[#e6edf3]">{children}</code>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white mt-10 mb-3 first:mt-0">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-[#1d1d1f] dark:text-white mt-6 mb-2">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-[#3a3a3c] dark:text-[#aeaeb2] mb-3">{children}</p>;
}
function Callout({ type, children }: { type: "tip" | "warn" | "danger"; children: React.ReactNode }) {
  const styles = {
    tip:    "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
    warn:   "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
    danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
  };
  const icons = { tip: "💡", warn: "⚠️", danger: "🚨" };
  return <div className={`border rounded-xl px-4 py-3 my-4 text-sm ${styles[type]}`}><span className="mr-1.5">{icons[type]}</span>{children}</div>;
}

function CmdTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="text-left py-2 px-3 text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] w-[40%]">Comando</th>
            <th className="text-left py-2 px-3 text-xs font-semibold text-[#6e6e73] dark:text-[#86868b]">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([cmd, desc], i) => (
            <tr key={i} className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
              <td className="py-2 px-3 font-mono text-xs text-[#1d1d1f] dark:text-[#e6edf3] align-top">{cmd}</td>
              <td className="py-2 px-3 text-xs text-[#3a3a3c] dark:text-[#aeaeb2] align-top">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function SectionIntro() {
  return (
    <>
      <H2>¿Qué es Git?</H2>
      <P>Git es un <strong>sistema de control de versiones distribuido</strong> creado por Linus Torvalds en 2005 para gestionar el kernel de Linux. Hoy es el estándar de facto en el desarrollo de software.</P>
      <P>A diferencia de los sistemas centralizados (SVN, CVS), en Git cada desarrollador tiene una copia completa del historial. Esto significa que puedes trabajar sin conexión, hacer commits localmente y sincronizar cuando quieras.</P>

      <H3>Conceptos fundamentales</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          { term: "Repositorio", def: "Carpeta que Git gestiona. Contiene todos los archivos y su historial completo." },
          { term: "Commit", def: "Instantánea (snapshot) del estado del proyecto en un momento concreto." },
          { term: "Branch", def: "Línea de desarrollo independiente. La rama principal suele llamarse main o master." },
          { term: "Staging Area", def: "Zona intermedia donde preparas los cambios antes de hacer commit." },
          { term: "HEAD", def: "Puntero que indica en qué commit/rama estás trabajando actualmente." },
          { term: "Remote", def: "Copia del repositorio en un servidor (GitHub, GitLab, Bitbucket…)." },
          { term: "Merge", def: "Unir el historial de dos ramas en una sola." },
          { term: "Conflicto", def: "Ocurre cuando dos ramas han modificado la misma parte de un archivo." },
        ].map(({ term, def }) => (
          <div key={term} className="rounded-xl border border-black/8 dark:border-white/8 p-3">
            <p className="text-xs font-bold text-[#1d1d1f] dark:text-white mb-1">{term}</p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{def}</p>
          </div>
        ))}
      </div>

      <H3>El ciclo de vida de un archivo</H3>
      <P>Los archivos en Git pasan por cuatro estados:</P>
      <Code>{`Untracked  ──git add──►  Staged  ──git commit──►  Committed
                                ▲                          │
                                └─────git add──────────────┘
                                    (tras modificar)

Modified  = archivo trackeado con cambios sin añadir al staging`}</Code>

      <H3>¿Por qué Git y no otro?</H3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          { icon: "⚡", title: "Velocidad", text: "Casi todas las operaciones son locales, sin latencia de red." },
          { icon: "🔒", title: "Integridad", text: "Cada commit tiene un hash SHA-1 único. Nada puede modificarse sin que Git lo detecte." },
          { icon: "🌿", title: "Ramificación", text: "Crear y cambiar de rama es instantáneo. Fomenta trabajar en ramas por feature." },
        ].map(({ icon, title, text }) => (
          <div key={title} className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/10 dark:to-amber-950/10 border border-orange-200 dark:border-orange-800/40 p-4">
            <div className="text-2xl mb-2">{icon}</div>
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">{title}</p>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">{text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SectionConfig() {
  return (
    <>
      <H2>Configuración inicial</H2>
      <P>Antes de hacer cualquier commit, Git necesita saber quién eres. Esta información se incluye en cada commit que hagas.</P>

      <H3>Identidad global</H3>
      <Code>{`git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"`}</Code>

      <H3>Editor por defecto</H3>
      <Code>{`# VS Code
git config --global core.editor "code --wait"

# Vim
git config --global core.editor "vim"

# Nano (más sencillo)
git config --global core.editor "nano"`}</Code>

      <H3>Alias útiles</H3>
      <P>Los alias te ahorran escribir los comandos largos constantemente:</P>
      <Code>{`git config --global alias.st "status"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.undo "reset HEAD~1 --mixed"
git config --global alias.staged "diff --cached"`}</Code>
      <P>Después puedes usar <Inline>git st</Inline> en lugar de <Inline>git status</Inline>, <Inline>git lg</Inline> para ver el grafo de ramas, etc.</P>

      <H3>Configuración por proyecto</H3>
      <P>Sin <Inline>--global</Inline>, la configuración solo afecta al repositorio actual (se guarda en <Inline>.git/config</Inline>):</P>
      <Code>{`# Usar un email diferente en un proyecto de trabajo
git config user.email "yo@empresa.com"`}</Code>

      <H3>Ver la configuración</H3>
      <Code>{`git config --list              # Ver toda la configuración
git config --list --global    # Solo la global
git config user.name          # Ver un valor concreto`}</Code>

      <H3>Archivo .gitignore</H3>
      <P>Lista de patrones de archivos que Git debe ignorar. Se crea en la raíz del proyecto:</P>
      <Code>{`# Dependencias
node_modules/
vendor/

# Variables de entorno (¡nunca al repositorio!)
.env
.env.local
.env.*.local

# Builds
dist/
build/
.next/

# Logs
*.log
npm-debug.log*

# Sistema operativo
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/
*.swp`}</Code>
      <Callout type="danger">Nunca subas archivos <strong>.env</strong> con credenciales reales. Añádelos siempre al .gitignore antes de hacer el primer commit.</Callout>
    </>
  );
}

function SectionBasico() {
  return (
    <>
      <H2>Comandos básicos</H2>

      <H3>Inicializar y clonar</H3>
      <Code>{`# Crear un nuevo repositorio en la carpeta actual
git init

# Inicializar con nombre de rama principal
git init -b main

# Clonar un repositorio remoto
git clone https://github.com/usuario/repo.git

# Clonar en una carpeta con nombre diferente
git clone https://github.com/usuario/repo.git mi-proyecto

# Clonar solo una rama específica
git clone -b feature/login https://github.com/usuario/repo.git`}</Code>

      <H3>Estado y diferencias</H3>
      <Code>{`git status               # Ver estado de los archivos
git status -s            # Vista compacta (M = modified, A = added, ? = untracked)

git diff                 # Cambios en archivos no staged
git diff --staged        # Cambios en archivos staged (listos para commit)
git diff HEAD            # Todos los cambios desde el último commit
git diff rama1 rama2     # Diferencias entre dos ramas`}</Code>

      <H3>Staging y commits</H3>
      <Code>{`# Añadir al staging
git add archivo.txt           # Un archivo concreto
git add src/                  # Toda una carpeta
git add *.js                  # Por patrón
git add .                     # Todo lo modificado y nuevo
git add -p                    # Interactivo: decide chunk a chunk qué añadir

# Quitar del staging (sin perder los cambios)
git restore --staged archivo.txt
git reset HEAD archivo.txt    # Equivalente en versiones antiguas

# Hacer commit
git commit -m "feat: añadir login con JWT"
git commit -am "fix: corregir bug en formulario"  # add + commit (solo archivos ya trackeados)
git commit --amend -m "Mensaje corregido"          # Corregir el último commit (antes de push)`}</Code>

      <H3>Historial de commits</H3>
      <Code>{`git log                          # Historial completo
git log --oneline                # Una línea por commit
git log --oneline --graph        # Con grafo ASCII de ramas
git log --oneline --all          # Incluye todas las ramas
git log -n 5                     # Solo los últimos 5 commits
git log --author="Juan"          # Filtrar por autor
git log --since="2 weeks ago"    # Filtrar por fecha
git log --grep="login"           # Buscar en mensajes de commit
git log -S "función"             # Commits que añadieron/quitaron "función"
git log -- archivo.txt           # Historial de un archivo concreto

git show abc1234                 # Ver contenido de un commit
git show HEAD                    # Ver el último commit
git show HEAD~2                  # Ver el penúltimo commit`}</Code>

      <H3>Deshacer cambios</H3>
      <Code>{`# Descartar cambios en el working tree (no staged)
git restore archivo.txt           # Recuperar la versión del último commit
git checkout -- archivo.txt       # Equivalente antiguo

# Quitar del staging (mantiene los cambios)
git restore --staged archivo.txt

# Deshacer el último commit (mantiene los cambios en staging)
git reset --soft HEAD~1

# Deshacer el último commit (mantiene los cambios sin staging)
git reset --mixed HEAD~1           # Es el --mixed por defecto

# Deshacer el último commit y los cambios (¡destructivo!)
git reset --hard HEAD~1

# Revertir un commit creando uno nuevo (seguro en ramas compartidas)
git revert abc1234
git revert HEAD                    # Revertir el último commit`}</Code>
      <Callout type="warn"><strong>git reset --hard</strong> es destructivo: pierdes los cambios permanentemente. Úsalo solo en ramas locales que no hayas compartido con nadie.</Callout>

      <H3>Stash — guardar cambios temporalmente</H3>
      <Code>{`git stash                          # Guardar cambios actuales en la pila
git stash push -m "WIP: login"    # Con nombre descriptivo
git stash list                     # Ver todos los stashes guardados
git stash pop                      # Recuperar el último stash y eliminarlo
git stash apply stash@{1}          # Aplicar un stash concreto sin eliminarlo
git stash drop stash@{1}           # Eliminar un stash
git stash clear                    # Eliminar todos los stashes
git stash branch feature/nueva     # Crear rama desde el stash`}</Code>
      <Callout type="tip">Usa <Inline>git stash</Inline> cuando necesitas cambiar de rama urgentemente sin perder el trabajo en curso.</Callout>

      <H3>Etiquetar versiones (tags)</H3>
      <Code>{`git tag                            # Ver todos los tags
git tag v1.0.0                     # Crear tag ligero
git tag -a v1.0.0 -m "Release 1.0" # Tag anotado (recomendado)
git tag -a v1.0.0 abc1234          # Taggear un commit anterior
git push origin v1.0.0             # Subir un tag al remoto
git push origin --tags             # Subir todos los tags
git tag -d v1.0.0                  # Eliminar tag local
git push origin --delete v1.0.0   # Eliminar tag remoto`}</Code>
    </>
  );
}

function SectionRamas() {
  return (
    <>
      <H2>Ramas (branches)</H2>
      <P>Las ramas son el mecanismo más potente de Git. Crear una rama es instantáneo y casi gratuito en recursos: Git solo crea un nuevo puntero al commit actual.</P>

      <H3>Gestión de ramas</H3>
      <Code>{`git branch                         # Ver ramas locales
git branch -a                      # Ver ramas locales y remotas
git branch -v                      # Ver ramas con el último commit

git branch feature/login           # Crear rama
git checkout feature/login         # Cambiar a esa rama
git checkout -b feature/login      # Crear y cambiar en un solo paso (clásico)
git switch feature/login           # Cambiar de rama (comando moderno)
git switch -c feature/login        # Crear y cambiar (moderno)

git branch -d feature/login        # Eliminar rama (solo si está mergeada)
git branch -D feature/login        # Forzar eliminación
git branch -m nombre-nuevo         # Renombrar la rama actual
git branch -m viejo nuevo          # Renombrar cualquier rama`}</Code>

      <H3>Merge — unir ramas</H3>
      <P>Merge incorpora los cambios de una rama en otra. Siempre se hace desde la rama destino:</P>
      <Code>{`# Mergear feature/login en main
git checkout main
git merge feature/login

# Merge sin fast-forward (crea siempre un commit de merge)
git merge --no-ff feature/login

# Merge squash (aplana todos los commits en uno)
git merge --squash feature/login
git commit -m "feat: añadir sistema de login"

# Abortar un merge en curso
git merge --abort`}</Code>

      <H3>Fast-forward vs merge commit</H3>
      <Code>{`# Fast-forward: si main no tiene commits nuevos, mueve el puntero
# Antes:  main──A──B
#               └──C──D  (feature)
# Después: main──A──B──C──D  (no hay commit de merge)

# Merge commit: cuando hay divergencia
# Antes:  main──A──B──E
#               └──C──D  (feature)
# Después: main──A──B──E──M  (M = merge commit)
#                    └──C──D──┘`}</Code>

      <H3>Rebase — reescribir el historial</H3>
      <P>Rebase mueve los commits de tu rama y los aplica encima de otra, creando un historial más lineal:</P>
      <Code>{`# Rebasar feature sobre main
git checkout feature/login
git rebase main

# Rebase interactivo: reescribir los últimos 3 commits
git rebase -i HEAD~3

# En el editor verás algo así:
# pick abc1234 feat: añadir formulario
# pick def5678 fix: typo en label
# pick ghi9012 feat: añadir validación

# Comandos disponibles:
# pick   = mantener el commit tal cual
# reword = cambiar el mensaje del commit
# edit   = pausar para editar el commit
# squash = fusionar con el commit anterior (combina mensajes)
# fixup  = fusionar con el anterior (descarta el mensaje)
# drop   = eliminar el commit

# Continuar después de resolver conflictos
git rebase --continue

# Abortar el rebase
git rebase --abort`}</Code>
      <Callout type="danger"><strong>Regla de oro del rebase:</strong> nunca hagas rebase de commits que ya hayas subido a un repositorio compartido. Reescribir historial público rompe los repos de tus compañeros.</Callout>

      <H3>Cherry-pick — copiar commits concretos</H3>
      <Code>{`# Copiar un commit a la rama actual
git cherry-pick abc1234

# Copiar varios commits
git cherry-pick abc1234 def5678

# Copiar un rango de commits
git cherry-pick abc1234..ghi9012

# Solo aplicar cambios sin hacer commit (para revisar antes)
git cherry-pick --no-commit abc1234`}</Code>
    </>
  );
}

function SectionRemoto() {
  return (
    <>
      <H2>Repositorios remotos</H2>

      <H3>Gestionar remotos</H3>
      <Code>{`git remote                           # Ver remotos configurados
git remote -v                        # Ver URLs de fetch y push
git remote add origin https://...    # Añadir remoto
git remote add upstream https://...  # Añadir segundo remoto (fork workflow)
git remote rename origin nuevo       # Renombrar
git remote remove origin             # Eliminar remoto
git remote set-url origin https://...# Cambiar URL`}</Code>

      <H3>Fetch, pull y push</H3>
      <Code>{`# Fetch: descargar cambios sin integrarlos
git fetch origin                     # Traer todo del remoto
git fetch origin main                # Solo la rama main
git fetch --prune                    # Eliminar ramas remotas eliminadas

# Pull: fetch + merge (o rebase si se configura así)
git pull                             # Rama actual desde su upstream
git pull origin main                 # Explícito
git pull --rebase                    # Usar rebase en vez de merge
git pull --rebase=preserve           # Rebase preservando merge commits

# Push: subir commits locales
git push origin main                 # Subir rama main
git push -u origin feature/login     # Subir y establecer upstream
git push --force-with-lease          # Push forzado seguro (falla si alguien subió)
git push --force                     # Push forzado (¡usa con cuidado!)
git push origin --delete feature/login  # Eliminar rama remota`}</Code>
      <Callout type="warn"><Inline>git push --force</Inline> sobreescribe el historial remoto sin comprobaciones. Usa siempre <Inline>--force-with-lease</Inline> que falla si otro desarrollador ha subido commits mientras tanto.</Callout>

      <H3>Seguimiento de ramas remotas</H3>
      <Code>{`# Ver qué ramas locales siguen a qué ramas remotas
git branch -vv

# Establecer upstream manualmente
git branch --set-upstream-to=origin/main main

# Crear rama local a partir de una remota
git checkout -b feature/x origin/feature/x
git switch -c feature/x origin/feature/x  # versión moderna`}</Code>

      <H3>Trabajar con forks</H3>
      <Code>{`# Añadir el repositorio original como "upstream"
git remote add upstream https://github.com/original/repo.git

# Sincronizar tu fork con el original
git fetch upstream
git checkout main
git merge upstream/main

# O con rebase (historial más limpio)
git rebase upstream/main`}</Code>
    </>
  );
}

function SectionConflictos() {
  const [demo, setDemo] = useState<"none" | "markers" | "resolved">("none");
  return (
    <>
      <H2>Resolución de conflictos</H2>
      <P>Un conflicto ocurre cuando Git no puede fusionar automáticamente dos versiones del mismo fragmento de código. Son inevitables en proyectos con varios desarrolladores y saber resolverlos bien es una habilidad esencial.</P>

      <H3>¿Cuándo ocurren los conflictos?</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {[
          { op: "git merge", cuando: "Dos ramas modificaron la misma línea de un archivo." },
          { op: "git rebase", cuando: "Al aplicar commits encima de otra rama, hay cambios contradictorios." },
          { op: "git cherry-pick", cuando: "El commit que copias modifica código que también cambió en la rama destino." },
          { op: "git pull", cuando: "Cambios locales y cambios remotos afectan las mismas líneas." },
          { op: "git stash pop", cuando: "El stash modifica líneas que también cambiaste después de guardarlo." },
          { op: "git revert", cuando: "El commit a revertir tiene dependencias con otros cambios." },
        ].map(({ op, cuando }) => (
          <div key={op} className="rounded-xl border border-black/8 dark:border-white/8 p-3">
            <code className="text-xs font-mono text-orange-600 dark:text-orange-400 font-bold">{op}</code>
            <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-1">{cuando}</p>
          </div>
        ))}
      </div>

      <H3>Los marcadores de conflicto</H3>
      <P>Cuando hay un conflicto, Git inserta marcadores especiales en el archivo afectado. Es fundamental entender qué significa cada parte:</P>

      <div className="flex gap-2 my-4">
        {(["none", "markers", "resolved"] as const).map((s) => (
          <button key={s} onClick={() => setDemo(s)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${demo === s ? "bg-orange-500 border-orange-500 text-white" : "border-black/12 dark:border-white/12 text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"}`}>
            {s === "none" ? "Código original" : s === "markers" ? "Con conflicto" : "Resuelto"}
          </button>
        ))}
      </div>

      {demo === "none" && <Code>{`// En la rama main:
function saludar(nombre) {
  return "Hola, " + nombre;
}

// En la rama feature/i18n:
function saludar(nombre) {
  return \`Buenos días, \${nombre}!\`;
}`}</Code>}

      {demo === "markers" && <Code>{`function saludar(nombre) {
<<<<<<< HEAD
  return "Hola, " + nombre;
=======
  return \`Buenos días, \${nombre}!\`;
>>>>>>> feature/i18n
}`}</Code>}

      {demo === "resolved" && <Code>{`function saludar(nombre, formal = false) {
  if (formal) return \`Buenos días, \${nombre}!\`;
  return \`Hola, \${nombre}!\`;
}`}</Code>}

      <div className="my-4 rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
        <div className="px-4 py-2 bg-black/3 dark:bg-white/3 border-b border-black/8 dark:border-white/8">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">Anatomía de los marcadores</p>
        </div>
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {[
            { marker: "<<<<<<< HEAD", color: "text-blue-600 dark:text-blue-400", desc: "Inicio del bloque de TU rama actual (HEAD). Lo que hay aquí es tu código local." },
            { marker: "=======", color: "text-[#6e6e73]", desc: "Separador. Lo que hay arriba es de tu rama; lo de abajo es de la rama entrante." },
            { marker: ">>>>>>> feature/i18n", color: "text-emerald-600 dark:text-emerald-400", desc: "Fin del bloque de la rama que estás mergeando. El nombre indica la rama origen." },
          ].map(({ marker, color, desc }) => (
            <div key={marker} className="px-4 py-3 flex gap-3">
              <code className={`text-xs font-mono shrink-0 ${color}`}>{marker}</code>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <H3>El proceso completo de resolución</H3>
      <Code>{`# 1. Intentas mergear y Git te avisa de conflictos
git merge feature/i18n
# Auto-merging src/utils.js
# CONFLICT (content): Merge conflict in src/utils.js
# Automatic merge failed; fix conflicts and then commit the result.

# 2. Ver qué archivos tienen conflictos
git status
# On branch main
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#   (use "git merge --abort" to abort the merge)
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#         both modified:   src/utils.js

# 3. Ver un resumen de todos los conflictos de un archivo
git diff src/utils.js

# 4. Resolver los conflictos en tu editor
#    → Edita el archivo, elimina los marcadores y deja el código correcto

# 5. Marcar el archivo como resuelto
git add src/utils.js

# 6. Completar el merge
git commit
# (Git abrirá el editor con un mensaje de merge preescrito, puedes aceptarlo)
# O con mensaje personalizado:
git commit -m "merge: integrar i18n con compatibilidad de saludos formales"`}</Code>

      <H3>Abortar cuando todo se complica</H3>
      <Code>{`# Cancelar un merge en curso y volver al estado anterior
git merge --abort

# Cancelar un rebase en curso
git rebase --abort

# Cancelar un cherry-pick en curso
git cherry-pick --abort`}</Code>

      <H3>Estrategias para resolver conflictos</H3>
      <P>Hay tres enfoques cuando ves un conflicto:</P>
      <div className="space-y-3 my-4">
        {[
          {
            titulo: "Quedarte con tus cambios (--ours)",
            desc: "Descartas los cambios de la rama entrante y mantienes los tuyos.",
            cmd: "git checkout --ours src/utils.js\ngit add src/utils.js",
          },
          {
            titulo: "Quedarte con los cambios entrantes (--theirs)",
            desc: "Descartas tus cambios y aceptas los de la rama que estás mergeando.",
            cmd: "git checkout --theirs src/utils.js\ngit add src/utils.js",
          },
          {
            titulo: "Resolución manual (lo más habitual)",
            desc: "Editas el archivo, combinas las dos versiones de forma inteligente, eliminas los marcadores y haces git add.",
            cmd: "# Editar el archivo manualmente\ngit add src/utils.js",
          },
        ].map(({ titulo, desc, cmd }) => (
          <div key={titulo} className="rounded-xl border border-black/8 dark:border-white/8 overflow-hidden">
            <div className="px-4 py-2 bg-black/2 dark:bg-white/2">
              <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">{titulo}</p>
              <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mt-0.5">{desc}</p>
            </div>
            <Code>{cmd}</Code>
          </div>
        ))}
      </div>

      <H3>Herramientas de mergetool</H3>
      <P>Git puede lanzar una herramienta visual para resolver conflictos:</P>
      <Code>{`# Configurar la herramienta
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Alternativas populares
git config --global merge.tool vimdiff     # En terminal
git config --global merge.tool kdiff3      # GUI multiplataforma
git config --global merge.tool p4merge     # GUI muy visual

# Lanzar la herramienta en todos los conflictos
git mergetool

# Lanzarla para un archivo concreto
git mergetool src/utils.js`}</Code>

      <H3>Conflictos en rebase</H3>
      <P>En un rebase los conflictos se resuelven commit a commit. Es un proceso iterativo:</P>
      <Code>{`git rebase main

# Git para en el primer commit con conflicto:
# CONFLICT (content): Merge conflict in src/utils.js
# error: could not apply abc1234... feat: i18n

# 1. Resolver el conflicto en el archivo
# 2. Añadir al staging
git add src/utils.js

# 3. Continuar con el siguiente commit
git rebase --continue

# Si el conflicto genera un commit vacío (los cambios ya estaban):
git rebase --skip

# Repetir hasta que todos los commits estén aplicados`}</Code>
      <Callout type="tip">En un rebase, <Inline>--ours</Inline> y <Inline>--theirs</Inline> están <strong>intercambiados</strong> respecto al merge: <Inline>--ours</Inline> es la rama base (main) y <Inline>--theirs</Inline> es tu commit. Es contraintuitivo, ¡tenlo en cuenta!</Callout>

      <H3>Prevención de conflictos</H3>
      <div className="space-y-2 my-4">
        {[
          "Haz pull frecuentemente para mantener tu rama actualizada con main.",
          "Mantén las ramas de feature cortas (días, no semanas). Menos divergencia = menos conflictos.",
          "Comunica con tu equipo qué archivos estás modificando para evitar trabajo en paralelo sobre el mismo código.",
          "Usa archivos de configuración separados por entorno en lugar de modificar los mismos archivos.",
          "Estructura el código en módulos pequeños y cohesivos: menos líneas compartidas = menos conflictos.",
          "Configura el atributo merge en .gitattributes para archivos que siempre deben resolverse de una manera concreta.",
        ].map((tip, i) => (
          <div key={i} className="flex gap-3 text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            <span className="text-orange-500 shrink-0 font-bold mt-0.5">{i + 1}.</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>

      <H3>Configuración de estrategia de merge</H3>
      <Code>{`# Usar rebase automáticamente en pull (evita commits de merge innecesarios)
git config --global pull.rebase true

# Configurar qué hacer con ramas divergentes (Git >= 2.27)
git config --global pull.ff only      # Solo fast-forward, falla si hay divergencia
git config --global pull.rebase false # Siempre merge (comportamiento clásico)
git config --global pull.rebase true  # Siempre rebase`}</Code>

      <H3>Atributos de merge por archivo</H3>
      <Code>{`# .gitattributes — en la raíz del proyecto

# Los archivos de lock siempre se resuelven con --ours
package-lock.json merge=ours
yarn.lock merge=ours

# Los binarios se marcan como no mergeables (se elige una versión entera)
*.png binary
*.pdf binary`}</Code>
    </>
  );
}

function SectionAvanzado() {
  return (
    <>
      <H2>Comandos avanzados</H2>

      <H3>git bisect — encontrar el commit que introdujo un bug</H3>
      <P>Bisect hace una búsqueda binaria en el historial para encontrar el commit exacto que causó un problema:</P>
      <Code>{`# 1. Iniciar la sesión de bisect
git bisect start

# 2. Marcar el commit actual como malo (el bug existe aquí)
git bisect bad

# 3. Marcar un commit antiguo donde el bug no existía
git bisect good v1.2.0
# o con un hash: git bisect good abc1234

# Git hace checkout al commit del medio. Prueba si el bug existe:
# Si sí:
git bisect bad
# Si no:
git bisect good

# Repetir hasta que Git encuentre el commit culpable:
# "abc1234 is the first bad commit"

# 4. Terminar y volver a HEAD
git bisect reset

# Automatizar con un script de test
git bisect run npm test          # Bueno si sale 0, malo si sale != 0`}</Code>

      <H3>git reflog — la red de seguridad</H3>
      <P>El reflog es el historial de todos los movimientos de HEAD, incluyendo los que no aparecen en git log. Es la forma de recuperar commits aparentemente perdidos:</P>
      <Code>{`git reflog                         # Ver el historial completo de HEAD
git reflog show feature/login      # Reflog de una rama concreta

# Recuperar un commit "perdido" después de un reset --hard
git reflog
# HEAD@{0}: reset: moving to HEAD~1
# HEAD@{1}: commit: feat: añadir validación de email  ← este es el que perdiste
# HEAD@{2}: commit: feat: formulario de login

git checkout -b rescate HEAD@{1}   # Crear rama en el commit perdido
# o directamente:
git reset --hard HEAD@{1}         # Volver a ese estado (si estás seguro)`}</Code>
      <Callout type="tip">El reflog solo existe en tu repositorio local. No se sube con push. Los commits que no están en ninguna rama se eliminan tras el garbage collection (por defecto a los 30–90 días).</Callout>

      <H3>git worktree — varias ramas a la vez</H3>
      <P>Permite tener múltiples ramas del mismo repositorio en carpetas separadas simultáneamente:</P>
      <Code>{`# Crear un worktree para trabajar en una rama en paralelo
git worktree add ../hotfix origin/main

# Ver todos los worktrees
git worktree list

# Eliminar un worktree
git worktree remove ../hotfix`}</Code>

      <H3>git blame — quién escribió qué</H3>
      <Code>{`git blame archivo.js               # Ver qué commit y autor escribió cada línea
git blame -L 10,25 archivo.js      # Solo las líneas 10 a 25
git blame -w archivo.js            # Ignorar cambios de espacios en blanco
git blame --follow archivo.js      # Seguir el archivo si fue renombrado`}</Code>

      <H3>git clean — limpiar archivos no trackeados</H3>
      <Code>{`git clean -n                       # Ver qué se eliminaría (dry run)
git clean -f                       # Eliminar archivos no trackeados
git clean -fd                      # Incluir carpetas
git clean -fX                      # Solo archivos ignorados (.gitignore)
git clean -fdx                     # Archivos ignorados y no trackeados`}</Code>
      <Callout type="danger"><Inline>git clean -fd</Inline> es irreversible. Usa siempre <Inline>-n</Inline> primero para ver qué vas a eliminar.</Callout>

      <H3>git submodule — dependencias como repositorios</H3>
      <Code>{`# Añadir un submodule
git submodule add https://github.com/lib/utils.git vendor/utils

# Clonar un repo con submodules
git clone --recurse-submodules https://github.com/usuario/repo.git

# Actualizar submodules después de un pull
git submodule update --init --recursive

# Ver estado de submodules
git submodule status`}</Code>

      <H3>Manipular el staging de forma granular</H3>
      <Code>{`# Añadir solo parte de los cambios de un archivo (interactivo)
git add -p archivo.js
# Opciones: y=añadir hunk, n=ignorar, s=dividir en hunks más pequeños,
#           e=editar el hunk manualmente, q=salir

# Lo mismo para descartar cambios parcialmente
git restore -p archivo.js

# Ver diff de lo que está en staging
git diff --staged

# Sacar del staging solo parte de un archivo
git restore --staged -p archivo.js`}</Code>

      <H3>Reescribir historial en masa</H3>
      <Code>{`# Cambiar el email en todos los commits (ejemplo: corrección de credenciales)
git filter-branch --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "email-viejo@ejemplo.com" ]; then
    export GIT_COMMITTER_EMAIL="email-nuevo@ejemplo.com"
    export GIT_AUTHOR_EMAIL="email-nuevo@ejemplo.com"
fi
' --tag-name-filter cat -- --branches --tags

# Alternativa moderna: git-filter-repo (herramienta externa, más rápida)
# pip install git-filter-repo
git filter-repo --email-callback 'return email.replace(b"viejo@", b"nuevo@")'`}</Code>
      <Callout type="danger">Reescribir historial público rompe todos los clones existentes. Solo hazlo en repositorios privados o coordinado con todo el equipo.</Callout>
    </>
  );
}

function SectionFlujos() {
  return (
    <>
      <H2>Flujos de trabajo (Workflows)</H2>
      <P>Un workflow es la convención que sigue un equipo para organizar las ramas y el proceso de integración de código.</P>

      <H3>Feature Branch Workflow</H3>
      <P>El más básico: cada funcionalidad se desarrolla en su propia rama y se mergea a main cuando está lista.</P>
      <Code>{`# Desarrollador A
git switch -c feature/login
# ... trabajo ...
git push -u origin feature/login
# → Abrir Pull Request en GitHub/GitLab
# → Revisión de código → Merge a main

# Desarrollador B (sin bloquearse)
git switch -c feature/dashboard
# ... trabajo en paralelo ...`}</Code>

      <H3>Gitflow</H3>
      <P>Más estructurado. Usa ramas con roles específicos para proyectos con releases periódicas:</P>
      <Code>{`# Ramas permanentes:
# main     → código en producción, solo recibe merges de release/* y hotfix/*
# develop  → integración continua, rama base para features

# Ramas temporales:
# feature/*  → nuevas funcionalidades (salen de develop)
# release/*  → preparación de una release (salen de develop)
# hotfix/*   → correcciones urgentes en producción (salen de main)

# Flujo típico de una feature
git switch -c feature/pago develop
# ... trabajo ...
git switch develop
git merge --no-ff feature/pago
git branch -d feature/pago

# Flujo de una release
git switch -c release/1.2.0 develop
# ... ajustes de versión, correcciones menores ...
git switch main && git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Release 1.2.0"
git switch develop && git merge --no-ff release/1.2.0
git branch -d release/1.2.0`}</Code>

      <H3>Trunk-Based Development</H3>
      <P>El equipo integra continuamente en main con ramas de feature muy cortas (horas, no días). Favorece CI/CD:</P>
      <Code>{`# Ramas de feature muy cortas (< 1 día idealmente)
git switch -c feature/boton-submit
# ... cambio pequeño y concreto ...
git switch main
git merge feature/boton-submit   # fast-forward casi siempre
git branch -d feature/boton-submit
git push

# Feature flags para código no terminado en producción
// codigo.js
if (featureFlags.isEnabled('nuevo-pago')) {
  // código nuevo
} else {
  // código antiguo (siempre llega a producción)
}`}</Code>

      <H3>Convención de nombres de rama</H3>
      <CmdTable rows={[
        ["feature/nombre-corto",    "Nueva funcionalidad"],
        ["fix/descripcion-bug",     "Corrección de bug"],
        ["hotfix/critico",          "Corrección urgente en producción"],
        ["release/1.2.0",           "Preparación de una versión"],
        ["chore/actualizar-deps",   "Mantenimiento (sin cambio funcional)"],
        ["docs/readme-setup",       "Documentación"],
        ["refactor/auth-service",   "Refactoring sin cambio funcional"],
        ["test/login-unit-tests",   "Tests"],
      ]} />

      <H3>Convención de mensajes de commit (Conventional Commits)</H3>
      <P>Formato estándar ampliamente adoptado: <Inline>tipo(scope): descripción</Inline></P>
      <Code>{`feat(auth): añadir login con JWT
fix(api): corregir respuesta 500 en /users
docs(readme): actualizar instrucciones de instalación
chore(deps): actualizar react a 19.0
refactor(db): extraer lógica de consultas a repositorio
test(auth): añadir tests unitarios para JWT validation
style(nav): corregir alineación del logo en móvil
perf(images): implementar lazy loading en galería

# Commit con breaking change
feat(api)!: cambiar formato de respuesta a { success, data, error }

# Commit con descripción larga
fix(auth): corregir expiración de tokens

El token de acceso no se renovaba correctamente cuando el
refresh token también había expirado. Ahora se redirige
al login en lugar de entrar en un bucle infinito.

Fixes #123`}</Code>
    </>
  );
}

function SectionReferencia() {
  return (
    <>
      <H2>Referencia rápida</H2>

      <H3>Comandos esenciales del día a día</H3>
      <CmdTable rows={[
        ["git status",                   "Ver estado del repositorio"],
        ["git add .",                    "Añadir todos los cambios al staging"],
        ["git commit -m \"mensaje\"",    "Hacer commit"],
        ["git pull",                     "Traer y fusionar cambios del remoto"],
        ["git push",                     "Subir commits al remoto"],
        ["git switch -c feature/x",      "Crear y cambiar a nueva rama"],
        ["git switch main",              "Cambiar de rama"],
        ["git merge feature/x",         "Mergear una rama en la actual"],
        ["git stash",                    "Guardar cambios temporalmente"],
        ["git stash pop",               "Recuperar cambios guardados"],
        ["git log --oneline --graph",   "Ver historial visual"],
      ]} />

      <H3>Deshacer cosas</H3>
      <CmdTable rows={[
        ["git restore archivo",          "Descartar cambios locales (no staged)"],
        ["git restore --staged archivo", "Quitar del staging"],
        ["git commit --amend",           "Corregir el último commit"],
        ["git reset --soft HEAD~1",      "Deshacer commit, mantener cambios staged"],
        ["git reset --mixed HEAD~1",     "Deshacer commit, mantener cambios unstaged"],
        ["git reset --hard HEAD~1",      "Deshacer commit y perder cambios (¡peligroso!)"],
        ["git revert HEAD",              "Revertir último commit creando uno nuevo"],
        ["git reflog",                   "Ver historial completo para recuperar commits"],
        ["git merge --abort",            "Cancelar un merge en curso"],
        ["git rebase --abort",           "Cancelar un rebase en curso"],
        ["git clean -fd",                "Eliminar archivos no trackeados (¡irreversible!)"],
      ]} />

      <H3>Ramas y remotos</H3>
      <CmdTable rows={[
        ["git branch",                   "Ver ramas locales"],
        ["git branch -a",                "Ver todas las ramas (locales + remotas)"],
        ["git branch -d rama",           "Eliminar rama local"],
        ["git push origin --delete rama","Eliminar rama remota"],
        ["git fetch --prune",            "Sincronizar y limpiar ramas remotas eliminadas"],
        ["git push --force-with-lease",  "Push forzado seguro"],
        ["git remote -v",                "Ver URLs de los remotos"],
        ["git rebase -i HEAD~3",         "Rebase interactivo (últimos 3 commits)"],
        ["git cherry-pick abc1234",      "Copiar un commit a la rama actual"],
      ]} />

      <H3>Resolución de conflictos</H3>
      <CmdTable rows={[
        ["git status",                          "Ver archivos con conflictos"],
        ["git diff",                            "Ver los marcadores de conflicto"],
        ["git checkout --ours archivo",         "Quedarse con los cambios de la rama actual"],
        ["git checkout --theirs archivo",       "Quedarse con los cambios de la rama entrante"],
        ["git add archivo",                     "Marcar conflicto como resuelto"],
        ["git merge --abort",                   "Cancelar el merge y volver al estado anterior"],
        ["git mergetool",                       "Lanzar herramienta visual de merge"],
        ["git log --merge",                     "Ver commits que causaron el conflicto"],
        ["git diff --diff-filter=U",            "Ver solo archivos con conflictos sin resolver"],
      ]} />

      <H3>Inspección y búsqueda</H3>
      <CmdTable rows={[
        ["git log --oneline --all --graph",    "Grafo visual de todo el historial"],
        ["git log --author=\"Juan\"",          "Commits de un autor"],
        ["git log --grep=\"login\"",           "Buscar en mensajes de commit"],
        ["git log -S \"función\"",             "Commits que añadieron/eliminaron texto"],
        ["git blame archivo",                  "Ver quién escribió cada línea"],
        ["git bisect start/good/bad",          "Búsqueda binaria de un bug"],
        ["git show abc1234",                   "Ver contenido de un commit"],
        ["git diff rama1 rama2",               "Diferencias entre ramas"],
      ]} />

      <H3>Estados de un archivo</H3>
      <Code>{`# git status -s — lectura rápida
??  = Untracked (nuevo, sin trackear)
 M  = Modified (modificado, sin staging)
M   = Modified (modificado, en staging)
MM  = Modified en staging Y también modificado después
A   = Added (nuevo, en staging)
D   = Deleted
R   = Renamed
C   = Copied
UU  = Unmerged (conflicto sin resolver)`}</Code>

      <Callout type="tip">
        Añade el alias <Inline>git lg</Inline> configurado antes y verás el grafo de commits en una sola línea. Es el comando que más usarás en el día a día una vez que empieces a trabajar con ramas.
      </Callout>
    </>
  );
}

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  intro:      SectionIntro,
  config:     SectionConfig,
  basico:     SectionBasico,
  ramas:      SectionRamas,
  remoto:     SectionRemoto,
  conflictos: SectionConflictos,
  avanzado:   SectionAvanzado,
  flujos:     SectionFlujos,
  referencia: SectionReferencia,
};

export default function GitContent() {
  const [active, setActive] = useState<SectionId>("intro");
  const ActiveSection = SECTION_COMPONENTS[active];

  return (
    <div className="flex gap-8">
      {/* Sidebar navegación */}
      <aside className="hidden lg:block w-52 shrink-0">
        <nav className="sticky top-6 flex flex-col gap-0.5">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                active === s.id
                  ? "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 font-medium"
                  : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}>
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        {/* Selector móvil */}
        <div className="lg:hidden mb-6">
          <select value={active} onChange={(e) => setActive(e.target.value as SectionId)}
            className="w-full rounded-xl border border-black/12 dark:border-white/12 bg-transparent text-sm px-3 py-2 text-[#1d1d1f] dark:text-white">
            {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <ActiveSection />

        {/* Navegación inferior */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-black/8 dark:border-white/8">
          {SECTIONS.findIndex((s) => s.id === active) > 0 ? (
            <button onClick={() => setActive(SECTIONS[SECTIONS.findIndex((s) => s.id === active) - 1].id)}
              className="flex items-center gap-2 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors">
              <span>←</span>
              {SECTIONS[SECTIONS.findIndex((s) => s.id === active) - 1].label}
            </button>
          ) : <div />}
          {SECTIONS.findIndex((s) => s.id === active) < SECTIONS.length - 1 ? (
            <button onClick={() => setActive(SECTIONS[SECTIONS.findIndex((s) => s.id === active) + 1].id)}
              className="flex items-center gap-2 text-sm text-[#6e6e73] hover:text-[#1d1d1f] dark:text-[#86868b] dark:hover:text-white transition-colors">
              {SECTIONS[SECTIONS.findIndex((s) => s.id === active) + 1].label}
              <span>→</span>
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
