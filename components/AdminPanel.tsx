'use client'

import { useState, useEffect } from 'react'
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Music,
  ExternalLink,
  X,
  Image as ImageIcon,
  Youtube,
} from 'lucide-react'

interface Project {
  id: string
  num: string
  title: string
  description: string
  projectType: 'live-website' | 'media-design'
  mediaSource: 'images' | 'youtube'
  imageCount: 0 | 1 | 2 | 3
  images: string[]
  youtubeUrl: string
  liveUrl: string
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
  linkedinUrl: string
  googleBusinessUrl: string
}

function emptyProject(): Project {
  return {
    id: '',
    num: '',
    title: '',
    description: '',
    projectType: 'live-website',
    mediaSource: 'images',
    imageCount: 1,
    images: [''],
    youtubeUrl: '',
    liveUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    tiktokUrl: '',
    linkedinUrl: '',
    googleBusinessUrl: '',
  }
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-[slideUp_0.3s_ease-out]">
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Project>(emptyProject())
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list')
  const [mediaTab, setMediaTab] = useState<'images' | 'youtube'>('images')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth')
    if (auth === 'admin-authenticated') {
      setIsLoggedIn(true)
      loadProjects()
    }
  }, [])

  function loadProjects() {
    const stored = localStorage.getItem('portfolio-projects')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed)
          return
        }
      } catch {}
    }
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
          localStorage.setItem('portfolio-projects', JSON.stringify(data))
        }
      })
      .catch(() => {})
  }

  function saveProjects(list: Project[]) {
    setProjects(list)
    localStorage.setItem('portfolio-projects', JSON.stringify(list))
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
      loadProjects()
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
    setFormData(emptyProject())
    setMediaTab('images')
    setShowForm(true)
    setActiveTab('add')
  }

  function handleEdit(project: Project) {
    setEditing(project)
    setFormData({ ...project })
    setMediaTab(project.mediaSource === 'youtube' ? 'youtube' : 'images')
    setShowForm(true)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()

    const proj = { ...formData }

    if (proj.mediaSource === 'images') {
      proj.youtubeUrl = ''
      proj.images = proj.images.slice(0, proj.imageCount)
      while (proj.images.length < proj.imageCount) proj.images.push('')
    } else {
      proj.images = []
      proj.imageCount = 0
    }

    let updated: Project[]
    if (editing) {
      updated = projects.map((p) => (p.id === editing.id ? proj : p))
    } else {
      const newId = String(Date.now())
      const num = String(projects.length + 1).padStart(2, '0')
      proj.id = newId
      proj.num = num
      updated = [...projects, proj]
    }

    saveProjects(updated)
    setToast(editing ? 'Project updated successfully!' : 'Project saved successfully!')
    setShowForm(false)
    setEditing(null)
    setFormData(emptyProject())
  }

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return
    const updated = projects.filter((p) => p.id !== id)
    saveProjects(updated)
    setToast('Project deleted!')
  }

  function getYoutubeEmbed(url: string): string {
    if (!url) return ''
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : ''
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
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#667] text-xs uppercase tracking-wider font-medium mb-1">Total Projects</div>
            <div className="text-[#D7E2EA] text-3xl font-black">{projects.length}</div>
          </div>
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#667] text-xs uppercase tracking-wider font-medium mb-1">Live Websites</div>
            <div className="text-[#D7E2EA] text-3xl font-black">{projects.filter((p) => p.projectType === 'live-website').length}</div>
          </div>
          <div className="bg-[#111111] border border-[#222] rounded-2xl p-5">
            <div className="text-[#667] text-xs uppercase tracking-wider font-medium mb-1">Media / Design</div>
            <div className="text-[#D7E2EA] text-3xl font-black">{projects.filter((p) => p.projectType === 'media-design').length}</div>
          </div>
        </div>

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

        {showForm && (
          <form onSubmit={handleSave} className="space-y-6 mb-8">
            <div className="bg-[#111111] border border-[#222] rounded-3xl p-6 sm:p-8">
              <h2 className="text-[#D7E2EA] font-bold text-xl mb-6">
                {editing ? 'Edit Project' : 'Add New Project'}
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="e.g. Nextlevel Studio"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors resize-none"
                    placeholder="Brief description of the project"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Project Type *</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: 'live-website' })}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${formData.projectType === 'live-website' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#0C0C0C] border border-[#333] text-[#8899AA]'}`}
                    >
                      Live Website
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: 'media-design' })}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${formData.projectType === 'media-design' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#0C0C0C] border border-[#333] text-[#8899AA]'}`}
                    >
                      Media / Design
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-3xl p-6 sm:p-8">
              <h2 className="text-[#D7E2EA] font-bold text-xl mb-6">Media Source</h2>
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMediaTab('images')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${mediaTab === 'images' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#0C0C0C] border border-[#333] text-[#8899AA]'}`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Images
                </button>
                <button
                  type="button"
                  onClick={() => setMediaTab('youtube')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${mediaTab === 'youtube' ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#0C0C0C] border border-[#333] text-[#8899AA]'}`}
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </button>
              </div>

              {mediaTab === 'images' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Image Count</label>
                    <div className="flex gap-3">
                      {([1, 2, 3] as const).map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            const images = [...formData.images]
                            while (images.length < n) images.push('')
                            setFormData({ ...formData, imageCount: n, images: images.slice(0, n), mediaSource: 'images' })
                          }}
                          className={`w-12 h-12 rounded-xl text-sm font-bold transition-colors cursor-pointer ${formData.imageCount === n ? 'bg-[#D7E2EA] text-[#0C0C0C]' : 'bg-[#0C0C0C] border border-[#333] text-[#8899AA]'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  {Array.from({ length: formData.imageCount }).map((_, i) => (
                    <div key={i}>
                      <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">Image {i + 1} URL *</label>
                      <input
                        type="url"
                        value={formData.images[i] || ''}
                        onChange={(e) => {
                          const images = [...formData.images]
                          images[i] = e.target.value
                          setFormData({ ...formData, images })
                        }}
                        className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      {formData.images[i] && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-[#333] h-32 bg-[#0C0C0C]">
                          <img src={formData.images[i]} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {mediaTab === 'youtube' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[#8899AA] text-xs font-medium uppercase tracking-wider mb-2">YouTube URL</label>
                    <input
                      type="url"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value, mediaSource: 'youtube' })}
                      className="w-full bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                  {formData.youtubeUrl && getYoutubeEmbed(formData.youtubeUrl) && (
                    <div className="rounded-xl overflow-hidden border border-[#333] aspect-video bg-[#0C0C0C]">
                      <iframe
                        src={getYoutubeEmbed(formData.youtubeUrl)}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-[#111111] border border-[#222] rounded-3xl p-6 sm:p-8">
              <h2 className="text-[#D7E2EA] font-bold text-xl mb-6">Links & Social</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-[#8899AA] shrink-0" />
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="flex-1 bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="Live project URL"
                  />
                  {formData.liveUrl && (
                    <a
                      href={formData.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-[#0C0C0C] border border-[#333] rounded-xl text-[#8899AA] text-sm hover:bg-[#222] transition-colors"
                    >
                      Preview
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Facebook className="w-5 h-5 text-[#8899AA] shrink-0" />
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="flex-1 bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="Facebook page URL"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="w-5 h-5 text-[#8899AA] shrink-0" />
                  <input
                    type="url"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="flex-1 bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="Instagram profile URL"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Music className="w-5 h-5 text-[#8899AA] shrink-0" />
                  <input
                    type="url"
                    value={formData.tiktokUrl}
                    onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                    className="flex-1 bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="TikTok profile URL"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-[#8899AA] shrink-0" />
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="flex-1 bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="LinkedIn profile URL"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#8899AA] shrink-0" />
                  <input
                    type="url"
                    value={formData.googleBusinessUrl}
                    onChange={(e) => setFormData({ ...formData, googleBusinessUrl: e.target.value })}
                    className="flex-1 bg-[#0C0C0C] border border-[#333] rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    placeholder="Google Business profile URL"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#D7E2EA] to-[#8899AA] text-[#0C0C0C] font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                {editing ? 'Update Project' : 'Save & Publish'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditing(null); setFormData(emptyProject()) }}
                className="px-8 py-3 bg-[#1a1a1a] border border-[#333] text-[#8899AA] rounded-xl hover:bg-[#222] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

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
                    <div className="flex gap-2 w-full sm:w-64 shrink-0">
                      {project.mediaSource === 'youtube' && project.youtubeUrl ? (
                        <div className="w-full rounded-lg overflow-hidden border border-[#333] aspect-video bg-[#0C0C0C]">
                          <iframe
                            src={getYoutubeEmbed(project.youtubeUrl)}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col gap-2 w-1/3">
                            {(project.images[0] || project.images[1]) && (
                              <div className="rounded-lg overflow-hidden bg-[#0C0C0C] aspect-[3/4]">
                                {project.images[0] ? (
                                  <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[#333] text-xs">Img 1</div>
                                )}
                              </div>
                            )}
                            {project.imageCount >= 2 && project.images[1] && (
                              <div className="rounded-lg overflow-hidden bg-[#0C0C0C] aspect-[3/4]">
                                <img src={project.images[1]} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          <div className="w-2/3">
                            <div className="rounded-lg overflow-hidden bg-[#0C0C0C] h-full">
                              {project.imageCount >= 3 && project.images[2] ? (
                                <img src={project.images[2]} alt="" className="w-full h-full object-cover" />
                              ) : project.imageCount === 1 && project.images[0] ? (
                                <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                              ) : project.imageCount === 2 && project.images[1] ? (
                                <img src={project.images[1]} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#333] text-xs">No image</div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#D7E2EA] font-black text-2xl">{project.num}</span>
                          <span className={`px-3 py-1 rounded-lg text-xs uppercase tracking-wider font-medium ${project.projectType === 'live-website' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-purple-500/10 border border-purple-500/30 text-purple-400'}`}>
                            {project.projectType === 'live-website' ? 'Live Website' : 'Media / Design'}
                          </span>
                        </div>
                        <h3 className="text-[#D7E2EA] font-bold text-xl">{project.title}</h3>
                        {project.description && (
                          <p className="text-[#8899AA] text-sm mt-1 line-clamp-2">{project.description}</p>
                        )}
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
