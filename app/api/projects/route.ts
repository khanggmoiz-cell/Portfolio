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

export async function GET() {
  try {
    const projects = await readProjects()
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const projects = await readProjects()
    const newId = String(projects.length + 1)
    const num = String(projects.length + 1).padStart(2, '0')

    const newProject = {
      id: newId,
      num,
      name: body.name || '',
      category: body.category || 'Client',
      col1img1: body.col1img1 || '',
      col1img2: body.col1img2 || '',
      col2img: body.col2img || '',
    }

    projects.push(newProject)
    await writeProjects(projects)
    return NextResponse.json(newProject, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 })
  }
}
