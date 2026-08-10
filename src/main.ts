import './style.css'

const GEMINI_API_URL =
  'https://wynltrizinpqilsnwwlq.functions.ap-south-1.nhost.run/v1/gemini'

let totalRuns = 1
let successfulRuns = 1

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <aside class="sidebar">
    <div class="logo">⚡ AI Builder</div>

    <nav>
      <a class="active">⚡ Workflows</a>
      <a>📁 Projects</a>
      <a>▶ Runs</a>
      <a>📊 Analytics</a>
      <a>⚙ Settings</a>
    </nav>

    <div class="sidebar-bottom">
      <div class="usage">
        <span>Monthly Usage</span>
        <strong id="usageText">1 / 100 runs</strong>
        <div class="progress"><div id="progressBar"></div></div>
      </div>

      <div class="user">
        <div class="avatar">R</div>
        <div>
          <strong>My Account</strong>
          <small>Free Plan</small>
        </div>
      </div>
    </div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div>
        <h1>AI Workflows</h1>
        <p>Create, manage and automate your AI workflows.</p>
      </div>

      <button class="create-btn" id="createWorkflow">
        + Create Workflow
      </button>
    </header>

    <section class="stats">
      <div class="stat-card">
        <span>Total Workflows</span>
        <strong id="totalWorkflows">0</strong>
      </div>

      <div class="stat-card">
        <span>Active Workflows</span>
        <strong id="activeWorkflows">0</strong>
      </div>

      <div class="stat-card">
        <span>Total Runs</span>
        <strong id="totalRuns">1</strong>
      </div>

      <div class="stat-card">
        <span>Success Rate</span>
        <strong id="successRate">100%</strong>
      </div>
    </section>

    <section class="workspace">
      <div class="workspace-header">
        <div>
          <h2>Your Workflows</h2>
          <p>Build powerful AI automation workflows.</p>
        </div>

        <input id="search" type="text" placeholder="Search workflows..." />
      </div>

      <div id="emptyState" class="empty-state">
        <div class="empty-icon">🤖</div>
        <h2>No workflows yet</h2>
        <p>Create your first AI workflow and automate your tasks.</p>

        <button class="create-btn" id="createWorkflow2">
          + Create Your First Workflow
        </button>
      </div>

      <div id="workflowArea" class="workflow-area hidden">
        <div class="workflow-title">
          <div>
            <h2 id="workflowName">My AI Workflow</h2>
            <p>Prompt → Gemini AI → Output</p>
          </div>

          <button class="run-top" id="runWorkflow">▶ Run Workflow</button>
        </div>

        <div class="canvas">

          <div class="node input-node">
            <div class="node-header">📥 Input</div>
            <h3>Prompt</h3>
            <p>User prompt</p>
          </div>

          <div class="arrow">↓</div>

          <div class="node gemini-node">
            <div class="node-header">🤖 Gemini AI</div>
            <h3>Generate Response</h3>
            <p>Google Gemini</p>
          </div>

          <div class="arrow">↓</div>

          <div class="node output-node">
            <div class="node-header">📤 Output</div>
            <h3>AI Response</h3>
            <p>Final result</p>
          </div>

        </div>

        <div class="prompt-panel">
          <label>Enter your prompt</label>

          <textarea
            id="promptInput"
            placeholder="Example: Explain artificial intelligence in simple words."
          ></textarea>

          <button class="run-btn" id="runWorkflow2">
            ▶ Run Workflow
          </button>

          <div id="loading" class="loading hidden">
            ⏳ Running workflow...
          </div>

          <div id="resultBox" class="result hidden">
            <h3>✨ AI Response</h3>
            <div id="aiResponse"></div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="modal" class="modal hidden">
    <div class="modal-box">
      <h2>✨ Create New Workflow</h2>
      <p>Create your first AI automation workflow.</p>

      <label>Workflow Name</label>
      <input id="workflowNameInput" value="My Gemini Workflow" />

      <label>Description</label>
      <input
        id="workflowDescription"
        value="Generate AI responses using Gemini"
      />

      <div class="modal-actions">
        <button id="cancelModal" class="cancel-btn">Cancel</button>
        <button id="confirmCreate" class="create-btn">
          Create Workflow
        </button>
      </div>
    </div>
  </div>
`

const modal = document.querySelector<HTMLElement>('#modal')
const emptyState = document.querySelector<HTMLElement>('#emptyState')
const workflowArea = document.querySelector<HTMLElement>('#workflowArea')

function openCreateModal() {
  modal?.classList.remove('hidden')
}

function closeCreateModal() {
  modal?.classList.add('hidden')
}

function createWorkflow() {
  const nameInput =
    document.querySelector<HTMLInputElement>('#workflowNameInput')

  const workflowName =
    document.querySelector<HTMLElement>('#workflowName')

  if (workflowName && nameInput?.value.trim()) {
    workflowName.textContent = nameInput.value.trim()
  }

  emptyState?.classList.add('hidden')
  workflowArea?.classList.remove('hidden')

  const total = document.querySelector<HTMLElement>('#totalWorkflows')
  const active = document.querySelector<HTMLElement>('#activeWorkflows')

  if (total) total.textContent = '1'
  if (active) active.textContent = '1'

  closeCreateModal()
}

async function runGemini() {
  const input =
    document.querySelector<HTMLTextAreaElement>('#promptInput')

  const responseBox =
    document.querySelector<HTMLElement>('#resultBox')

  const response =
    document.querySelector<HTMLElement>('#aiResponse')

  const loading =
    document.querySelector<HTMLElement>('#loading')

  const prompt = input?.value.trim()

  if (!prompt) {
    alert('Please enter a prompt.')
    return
  }

  loading?.classList.remove('hidden')
  responseBox?.classList.add('hidden')

  try {
    const res = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`)
    }

    const data = await res.json()

    if (response) {
      response.textContent =
        data.text || 'No response received.'
    }

    totalRuns++
    successfulRuns++

    const totalRunsElement =
      document.querySelector<HTMLElement>('#totalRuns')

    const successRate =
      document.querySelector<HTMLElement>('#successRate')

    const usage =
      document.querySelector<HTMLElement>('#usageText')

    const progress =
      document.querySelector<HTMLElement>('#progressBar')

    if (totalRunsElement) {
      totalRunsElement.textContent = totalRuns.toString()
    }

    if (successRate) {
      successRate.textContent =
        `${Math.round((successfulRuns / totalRuns) * 100)}%`
    }

    if (usage) {
      usage.textContent = `${totalRuns} / 100 runs`
    }

    if (progress) {
      progress.style.width = `${totalRuns}%`
    }

    responseBox?.classList.remove('hidden')

  } catch (error) {
    console.error(error)

    if (response) {
      response.textContent =
        error instanceof Error
          ? error.message
          : 'Something went wrong.'
    }

    responseBox?.classList.remove('hidden')
  } finally {
    loading?.classList.add('hidden')
  }
}

document
  .querySelector('#createWorkflow')
  ?.addEventListener('click', openCreateModal)

document
  .querySelector('#createWorkflow2')
  ?.addEventListener('click', openCreateModal)

document
  .querySelector('#cancelModal')
  ?.addEventListener('click', closeCreateModal)

document
  .querySelector('#confirmCreate')
  ?.addEventListener('click', createWorkflow)

document
  .querySelector('#runWorkflow')
  ?.addEventListener('click', runGemini)

document
  .querySelector('#runWorkflow2')
  ?.addEventListener('click', runGemini)