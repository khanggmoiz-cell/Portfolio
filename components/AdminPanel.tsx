'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string
  num: string
  name: string
  category: string
  col1img1: string
  col1img2: string
  col2img: string
}

const emptyProject = {
  name: '',
  category: 'Client',
  col1img1: '',
  col1img2: '',
  col2img: '',
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(emptyProject)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list')

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth')
    if (auth === 'admin-authenticated') {
      setIsLoggedIn(true)
      fetchProjects()
    }
  }, [])

  async function fetchProjects() {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.success) {
      sessionStorage.setItem('admin-auth', data.token)
      setIsLoggedIn(true)
      fetchProjects()
    } else {
      setLoginError('Invalid username or password')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('admin-auth')
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  function handleAddNew() {
    setEditing(null)
    setFormData(emptyProject)
    setShowForm(true)
    setActiveTab('add')
  }

  function handleEdit(project: Project) {
    setEditing(project)
    setFormData({
      name: project.name,
      category: project.category,
      col1img1: project.col1img1,
      col1img2: project.col1img2,
      col2img: project.col2img,
    })
    setShowForm(true)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    if (editing) {
      await fetch(`/api/projects/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    }

    setSaving(false)
    setShowForm(false)
    setEditing(null)
    setFormData(emptyProject)
    fetchProjects()
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    fetchProjects()
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D7E2EA] to-[#8899AA] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#D7E2EA]">Admin Panel</h1>
              <p className="text-[#667] mt-2 text-sm">Login to manage your projects</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm text-center">
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D7E2EA] to-[#8899AA] text-[#0C0C0C] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      {/* Top Bar */}
      <header className="border-b border-[#222] bg-[#111111]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D7E2EA] to-[#8899AA] rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#D7E2EA] font-bold text-lg leading-tight">Live Projects</h1>
              <p className="text-[#667] text-xs">Manage your portfolio projects</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#667] text-sm">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-xl text-[#8899AA] text-sm hover:bg-[#222] transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#667] text-xs uppercase tracking-wider font-medium mb-1">Total Projects</div>
            <div className="text-[#D7E2EA] text-3xl font-black">{projects.length}</div>
          </div>
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#667] text-xs uppercase tracking-wider font-medium mb-1">Client Projects</div>
            <div className="text-[#D7E2EA] text-3xl font-black">{projects.filter(p => p.category === 'Client').length}</div>
          </div>
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#667] text-xs uppercase tracking-wider font-medium mb-1">Personal Projects</div>
            <div className="text-[#D7E2EA] text-3xl font-black">{projects.filter(p => p.category === 'Personal').length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => { setActiveTab('list'); setShowForm(false) }}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === 'list' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#1a1a1a] text-[#8899AA] border border-[#333]'}`}
          >
            All Projects
          </button>
          <button
            onClick={handleAddNew}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === 'add' || showForm ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#1a1a1a] text-[#8899AA] border border-[#333]'}`}
          >
            + Add Project
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-6 sm:p-8 mb-8">
            <h2 className="text-[#D7E2EA] font-bold text-xl mb-6">
              {editing ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="e.g. Nextlevel Studio"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors cursor-pointer"
                  >
                    <option value="Client">Client</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Image 1 (Left Top) *</label>
                <input
                  type="url"
                  value={formData.col1img1}
                  onChange={(e) => setFormData({ ...formData, col1img1: e.target.value })}
                  className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  placeholder="https://example.com/image1.jpg"
                  required
                />
                {formData.col1img1 && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#333] h-32 bg-[#0C0C0C]">
                    <img src={formData.col1img1} alt="Preview 1" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Image 2 (Left Bottom) *</label>
                <input
                  type="url"
                  value={formData.col1img2}
                  onChange={(e) => setFormData({ ...formData, col1img2: e.target.value })}
                  className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  placeholder="https://example.com/image2.jpg"
                  required
                />
                {formData.col1img2 && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#333] h-32 bg-[#0C0C0C]">
                    <img src={formData.col1img2} alt="Preview 2" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Image 3 (Right Large) *</label>
                <input
                  type="url"
                  value={formData.col2img}
                  onChange={(e) => setFormData({ ...formData, col2img: e.target.value })}
                  className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                  placeholder="https://example.com/image3.jpg"
                  required
                />
                {formData.col2img && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-[#333] h-32 bg-[#0C0C0C]">
                    <img src={formData.col2img} alt="Preview 3" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-gradient-to-r from-[#D7E2EA] to-[#8899AA] text-[#0C0C0C] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : editing ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditing(null); setFormData(emptyProject) }}
                  className="px-8 py-3 bg-[#1a1a1a] border border-[#333] text-[#8899AA] rounded-xl hover:bg-[#222] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        {!showForm && (
          <div className="space-y-4">
            {projects.length === 0 ? (
              <div className="bg-[#111111] border border-[#222] rounded-3xl p-12 text-center">
                <p className="text-[#667] text-lg">No projects yet. Add your first project!</p>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#111111] border border-[#222] rounded-2xl p-4 sm:p-6 hover:border-[#444] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Images Preview */}
                    <div className="flex gap-2 w-full sm:w-64 shrink-0">
                      <div className="flex flex-col gap-2 w-1/3">
                        <div className="rounded-lg overflow-hidden bg-[#0C0C0C] aspect-[3/4]">
                          {project.col1img1 ? (
                            <img src={project.col1img1} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#333] text-xs">Img 1</div>
                          )}
                        </div>
                        <div className="rounded-lg overflow-hidden bg-[#0C0C0C] aspect-[3/4]">
                          {project.col1img2 ? (
                            <img src={project.col1img2} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#333] text-xs">Img 2</div>
                          )}
                        </div>
                      </div>
                      <div className="w-2/3">
                        <div className="rounded-lg overflow-hidden bg-[#0C0C0C] h-full">
                          {project.col2img ? (
                            <img src={project.col2img} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#333] text-xs">Img 3</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#D7E2EA] font-black text-2xl">{project.num}</span>
                          <span className="px-3 py-1 bg-[#0C0C0C] border border-[#333] rounded-lg text-[#8899AA] text-xs uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-[#D7E2EA] font-bold text-xl">{project.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => handleEdit(project)}
                          className="px-5 py-2.5 bg-[#0C0C0C] border border-[#D7E2EA] text-[#D7E2EA] rounded-xl text-sm font-medium hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-5 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
