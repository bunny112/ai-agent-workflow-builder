import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app">
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">AI</div>
        <div>
          <h2>Workflow Builder</h2>
          <span>AI Agent Platform</span>
        </div>
      </div>

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
          <strong>0 / 100 runs</strong>
          <div class="progress">
            <div></div>
          </div>
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
          <strong>0</strong>
        </div>

        <div class="stat-card">
          <span>Active Workflows</span>
          <strong>0</strong>
        </div>

        <div class="stat-card">
          <span>Total Runs</span>
          <strong>0</strong>
        </div>

        <div class="stat-card">
          <span>Success Rate</span>
          <strong>—</strong>
        </div>
      </section>

      <section class="workspace">
        <div class="workspace-header">
          <div>
            <h2>Your Workflows</h2>
            <p>Build powerful AI automation workflows.</p>
          </div>

          <input
            type="text"
            id="search"
            placeholder="Search workflows..."
          />
        </div>

        <div class="empty-state">
          <div class="empty-icon">🤖</div>
          <h2>No workflows yet</h2>
          <p>
            Create your first AI workflow and automate your tasks.
          </p>

          <button class="create-btn" id="createWorkflow2">
            + Create Your First Workflow
          </button>
        </div>
      </section>
    </main>
  </div>
`

document
  .querySelector('#createWorkflow')
  ?.addEventListener('click', () => {
    alert('Workflow creation will be connected next!')
  })

document
  .querySelector('#createWorkflow2')
  ?.addEventListener('click', () => {
    alert('Workflow creation will be connected next!')
  })