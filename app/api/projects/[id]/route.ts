import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

async function readProjects() {
  const data = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

async function writeProjects(projects: unknown[]) {
  await writeFile(DATA_FILE, JSON.stringify(projects, null, 2))
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const projects = await readProjects()
    const index = projects.findIndex((p: { id: string }) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = { ...projects[index], ...body }
    await writeProjects(projects)
    return NextResponse.json(projects[index])
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const projects = await readProjects()
    const filtered = projects.filter((p: { id: string }) => p.id !== id)

    if (filtered.length === projects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    await writeProjects(filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
